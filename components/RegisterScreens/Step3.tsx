// @ts-nocheck
import { View, Text, TextInput, ScrollView } from "react-native";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Step3Props {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  setCardNumber: () => void;
  setCardName: () => void;
  setExpiryDate: () => void;
}

const Step3 = ({
  cardName,
  cardNumber,
  expiryDate,
  setCardName,
  setCardNumber,
  setExpiryDate,
}: Step3Props) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        paddingBottom: 150,
        flexGrow: 1,
      }}
      style={{
        marginBottom: 200,
      }}
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      className="mt-3"
    >
      <Text className="text-lg font-semibold">Cadastrar Cartão</Text>

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
          keyboardType="numeric"
        />

        <AntDesign name="creditcard" size={20} color="gray" />
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
          value={expiryDate}
          onChangeText={(value) => setExpiryDate(value)}
          placeholder="Data de expiração"
          className="flex-1"
        />

        <MaterialIcons name="date-range" size={20} color="gray" />
      </View>

      <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
        <TextInput placeholder="Código de segurança (CVV)" className="flex-1" />

        <AntDesign name="checkcircleo" size={20} color="gray" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Step3;
