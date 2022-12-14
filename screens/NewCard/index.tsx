//@ts-nocheck
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import Card from "../../assets/images/card.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../utils/api";

const NewCard = ({ navigation, route }) => {
  const { userId } = route.params;
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      if (cardNumber && cardName && expiryDate && cvv) {
        setLoading(true);
        api
          .post("/cards?userId=" + userId, {
            cardName: cardName,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
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

  return (
    <KeyboardAvoidingView className="h-screen bg-[#f5f5f5] px-4 py-6">
      <View className="items-center flex-row justify-between mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 flex-row items-center -ml-1"
        >
          <Entypo name="chevron-left" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Perfil</Text>
        </TouchableOpacity>

        <Text className="text-gray-500 font-bold flex-1 text-center text-xl">
          Novo Cartão
        </Text>

        <View className="flex-1" />
      </View>

      <ImageBackground
        source={Card}
        className="w-full h-48 self-center mt-5"
        imageStyle={{
          borderRadius: 8,
        }}
      >
        <View className="absolute top-4 left-4">
          <Text className="text-[#f5f5f5] font-semibold">{cvv}</Text>
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
            {cardNumber}
          </Text>
        </View>

        <View className="absolute bottom-5 right-5">
          <Text className="text-[#f5f5f5] font-semibold">
            {expiryDate.replace(/(\d{2})(\d{2})/, "$1/$2").trim()}
          </Text>
        </View>

        <View className="absolute bottom-5 left-5">
          <Text className="text-[#f5f5f5] font-semibold">{cardName}</Text>
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        className="mt-3"
      >
        <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
          <TextInput
            value={cardNumber}
            maxLength={19}
            onChangeText={(value) => {
              setCardNumber(
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

          {cardNumber.length == 19 ? (
            <AntDesign name="checkcircleo" size={20} color="#048444" />
          ) : (
            <AntDesign name="creditcard" size={20} color="gray" />
          )}
        </View>

        <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
          <TextInput
            value={cardName}
            onChangeText={(value) => setCardName(value)}
            placeholder="Nome do titular no cartão"
            className="flex-1"
          />

          <AntDesign name="idcard" size={20} color="gray" />
        </View>
        <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
          <TextInput
            value={expiryDate.replace(/(\d{2})(\d{2})/, "$1/$2").trim()}
            onChangeText={(value) => setExpiryDate(value)}
            placeholder="Data de expiração"
            className="flex-1"
            maxLength={5}
            keyboardType="number-pad"
          />

          {expiryDate.length == 4 ? (
            <AntDesign name="checkcircleo" size={20} color="#048444" />
          ) : (
            <MaterialIcons name="date-range" size={20} color="gray" />
          )}
        </View>

        <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
          <TextInput
            value={cvv}
            onChangeText={(value) => setCvv(value)}
            placeholder="Código de segurança (CVV)"
            className="flex-1"
            keyboardType="numeric"
            maxLength={3}
          />

          {cvv.length == 3 ? (
            <AntDesign name="checkcircleo" size={20} color="#048444" />
          ) : (
            <AntDesign name="checkcircleo" size={20} color="gray" />
          )}
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        disabled={loading}
        onPress={mutation.mutateAsync}
        className="p-3 flex-row items-center justify-center mx-3 mb-3 bg-[#F26E1D] absolute bottom-0 right-0 left-0 rounded"
      >
        {loading ? (
          <>
            <Text className="text-[#f5f5f5] font-semibold text-lg">
              Processando...
            </Text>
            <ActivityIndicator color="#f5f5f5" />
          </>
        ) : (
          <>
            <Text className="text-[#f5f5f5] font-semibold text-lg">
              Concluir
            </Text>
          </>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default NewCard;
