// @ts-nocheck
import { View, Text, TextInput, ScrollView } from "react-native";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Step3 = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 150,
      }}
      style={{
        marginBottom: 200,
      }}
      showsVerticalScrollIndicator={false}
      className="mt-3"
    >
      <Text className="text-lg font-semibold">Cadastrar Cartão</Text>

      <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
        <TextInput placeholder="Número do cartão" className="flex-1" />

        <AntDesign name="creditcard" size={20} color="gray" />
      </View>

      <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
        <TextInput placeholder="Nome do titular no cartão" className="flex-1" />

        <AntDesign name="idcard" size={20} color="gray" />
      </View>

      <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
        <TextInput placeholder="Data de expiração" className="flex-1" />

        <MaterialIcons name="date-range" size={20} color="gray" />
      </View>

      <View className="w-full mt-4 border border-[#33333333] flex-row rounded items-center px-3 h-14 bg-white">
        <TextInput placeholder="Código de segurança (CVV)" className="flex-1" />

        <AntDesign name="checkcircleo" size={20} color="gray" />
      </View>
    </ScrollView>
  );
};

export default Step3;
