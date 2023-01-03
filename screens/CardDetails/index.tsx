//@ts-nocheck
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import Card from "../../assets/images/card.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { api } from "../../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CardDetails = ({ navigation, route }) => {
  const [newCardName, setNewCardName] = useState<string>("");
  const [newCardNumber, setNewCardNumber] = useState<string>("");
  const [newExpiryDate, setNewExpiryDate] = useState<string>("");
  const [newCvv, setNewCvv] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const { id, cardNumber, cardName, expiryDate, cvv } = route.params;
  if (!cardNumber && !cardName && !expiryDate && !cvv) {
    throw new Error("Sem Dados");
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      if (newCardName && newCardNumber && newCvv && newExpiryDate) {
        setLoading(true);
        api
          .put("/cards?id=" + id, {
            cardName: newCardName,
            cardNumber: newCardNumber,
            expiryDate: newExpiryDate,
            cvv: newCvv,
          })
          .then(() => {
            navigation.goBack();
            setLoading(false);
          });
      } else {
        alert("Preencha todos os campos!");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cards"]);
      },
    }
  );

  const deleteCard = useMutation(
    () => {
      setLoading(true);
      api.delete(`/cards/${id}`).then(() => {
        navigation.goBack();
        setLoading(false);
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cards"]);
      },
    }
  );

  return (
    <KeyboardAvoidingView
      className={`${
        Platform.OS === "ios" ? "mt-5" : "mt-8"
      } h-screen bg-[#f5f5f5] px-4`}
    >
      <View className="items-center flex-row justify-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 flex-row items-center -ml-1"
        >
          <Entypo name="chevron-down" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Pagamento</Text>
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={Card}
        className="w-full h-44 mt-4"
        imageStyle={{
          borderRadius: 8,
        }}
      >
        <View className="absolute top-4 left-4">
          <Text className="text-[#f5f5f5] font-semibold">
            {newCvv != "" ? newCvv : cvv}
          </Text>
        </View>

        <Image
          source={{
            uri: "https://logosmarcas.net/wp-content/uploads/2020/09/Mastercard-Logo.png",
          }}
          className="h-12 w-12 absolute right-3"
          resizeMode="contain"
        />

        <View className="absolute bottom-10 left-5">
          <Text className="text-lg text-[#f5f5f5] font-semibold">
            {newCardNumber != "" ? newCardNumber : cardNumber}
          </Text>
        </View>

        <View className="absolute bottom-5 right-5">
          <Text className="text-[#f5f5f5] font-semibold">
            {newExpiryDate != "" ? newExpiryDate : expiryDate}
          </Text>
        </View>

        <View className="absolute bottom-5 left-5">
          <Text className="text-[#f5f5f5] font-semibold">
            {newCardName != "" ? newCardName : cardName}
          </Text>
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        keyboardDismissMode="on-drag"
      >
        <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
          <TextInput
            value={newCardNumber}
            maxLength={19}
            onChangeText={(value) => {
              setNewCardNumber(
                value
                  .replace(/\s/g, "")
                  .replace(/(\d{4})/g, "$1 ")
                  .trim()
              );
            }}
            placeholder="Número do cartão"
            className="flex-1"
            keyboardType="number-pad"
            autoFocus
          />

          <AntDesign name="creditcard" size={20} color="gray" />
        </View>

        <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
          <TextInput
            value={newCardName}
            onChangeText={(value) => setNewCardName(value)}
            placeholder="Nome do titular no cartão"
            className="flex-1"
          />

          <AntDesign name="idcard" size={20} color="gray" />
        </View>

        <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
          <TextInput
            value={newExpiryDate}
            onChangeText={(value) => setNewExpiryDate(value)}
            placeholder="Data de expiração"
            className="flex-1"
          />

          <MaterialIcons name="date-range" size={20} color="gray" />
        </View>

        <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
          <TextInput
            value={newCvv}
            onChangeText={(value) => setNewCvv(value)}
            placeholder="Código de segurança (CVV)"
            className="flex-1"
            keyboardType="numeric"
            maxLength={3}
          />

          <AntDesign name="checkcircleo" size={20} color="gray" />
        </View>
      </KeyboardAwareScrollView>

      <View className="flex-row items-center absolute mx-3 space-x-1 bottom-16 left-0 right-0">
        {loading ? (
          <TouchableOpacity
            disabled={loading}
            className="flex-row flex-1 items-center justify-center p-3 rounded bg-[#F26E1D]"
          >
            <Text className="text-lg font-semibold text-[#f5f5f5]">
              Processando...
            </Text>
            <ActivityIndicator color="#f5f5f5" />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={mutation.mutateAsync}
              className="flex-1 items-center justify-center p-3 rounded bg-[#F26E1D]"
            >
              <Text className="text-lg font-semibold text-[#f5f5f5]">
                Atualizar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={deleteCard.mutateAsync}
              className="flex-1 items-center justify-center py-3 px-2 bg-transparent"
            >
              {deleteLoading ? (
                <>
                  <ActivityIndicator color="#252525" />
                </>
              ) : (
                <>
                  <Text className="text-lg font-semibold text-red-500">
                    Excluir
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CardDetails;
