// @ts-nocheck
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const InitialScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#F26E1D] items-center">
      <Image
        source={require("../../assets/images/whiteLogo.png")}
        className="w-56 h-56 mt-20 -mr-2"
        resizeMode="cover"
      />

      <View className="items-center mt-10">
        <Text className="text-[#f5f5f5] font-bold text-4xl">Bem Vindo!</Text>
        <Text className="text-[#f5f5f5] mt-1 font-medium text-base">
          A sua plataforma de livros online.
        </Text>
        <Text className="text-[#f5f5f5] font-medium text-base">
          Leia sem limites.
        </Text>
      </View>

      <View className="mt-11 space-y-3">
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          className="bg-[#f5f5f5] py-3 w-80 items-center justify-center rounded"
        >
          <Text className="text-[#F26E1D] font-semibold text-lg">
            Criar conta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          className="py-3 w-80 items-center justify-center rounded border border-[#f5f5f5]"
        >
          <Text className="text-white font-semibold text-lg">Fazer login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InitialScreen;
