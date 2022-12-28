// @ts-nocheck
import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Logo from "../../assets/images/logoOrange.png";

const AboutUs = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#e5e5e5] p-5">
      <View className="items-center flex-row justify-between my-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 flex-row items-center -ml-1"
        >
          <Entypo name="chevron-left" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Perfil</Text>
        </TouchableOpacity>

        <Text className="text-gray-500 font-bold flex-1 text-center text-xl">
          Sobre Nós
        </Text>

        <View className="flex-1" />
      </View>

      <Image
        source={Logo}
        className="self-center w-52 h-52 -mr-3"
        resizeMode="cover"
      />

      <Text className="text-center font-semibold text-lg">
        Nosso objetivo é incentivar e criar conexões satisfatórias por meio da
        leitura e da discussão. Acreditamos no poder do Book Club para aprimorar
        a experiência de leitura, apoiar a aprendizagem no decorrer da vida e
        contribuir uma grande comunidade de leitores.
      </Text>
    </View>
  );
};

export default AboutUs;
