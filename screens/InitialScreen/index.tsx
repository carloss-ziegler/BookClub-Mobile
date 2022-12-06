// @ts-nocheck
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const InitialScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#F26E1D] items-center">
      <Image
        source={require("../../assets/images/whiteLogo.png")}
        className="w-56 h-56 mt-20"
        resizeMode="cover"
      />

      <View className="items-center mt-10">
        <Text className="text-white font-bold text-4xl">Bem Vindo!</Text>
        <Text className="text-white mt-1 font-medium text-base">
          A sua plataforma de livros online.
        </Text>
        <Text className="text-white font-medium text-base">
          Leia sem limites.
        </Text>
      </View>

      <View className="mt-11 space-y-3">
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          className="bg-white py-3 w-80 items-center justify-center rounded"
        >
          <Text className="text-[#F26E1D] font-semibold text-lg">
            Criar conta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          className="py-3 w-80 items-center justify-center rounded border border-[#fff]"
        >
          <Text className="text-white font-semibold text-lg">Fazer login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InitialScreen;
