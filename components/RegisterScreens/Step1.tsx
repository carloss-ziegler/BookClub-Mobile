// @ts-nocheck
import { View, Text, TextInput } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

interface Step1Props {
  name: string;
  email: string;
  password: string;
  setName: () => void;
  setEmail: () => void;
  setPassword: () => void;
}

const Step1 = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}: Step1Props) => {
  return (
    <View className="mt-5">
      <View className="w-full border h-14 border-[#33333333] rounded bg-white flex-row items-center px-3">
        <TextInput
          value={name}
          onChangeText={(value) => setName(value)}
          placeholder="Nome completo"
          className="flex-1"
        />

        <AntDesign name="closecircleo" size={18} color="#9C9C9C" />
      </View>

      <View className="w-full mt-3 border h-14 border-[#33333333] rounded bg-white flex-row items-center px-3">
        <TextInput
          value={email}
          onChangeText={(value) => setEmail(value)}
          placeholder="Email"
          className="flex-1"
          keyboardType="email-address"
        />

        <AntDesign name="closecircleo" size={18} color="#9C9C9C" />
      </View>

      <View className="w-full mt-3 border h-14 border-[#33333333] rounded bg-white flex-row items-center px-3">
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="Senha"
          secureTextEntry
          className="flex-1"
        />

        <AntDesign name="eye" size={20} color="#9C9C9C" />
      </View>

      <View className="w-full mt-3 border h-14 border-[#33333333] rounded bg-white flex-row items-center px-3">
        <TextInput
          placeholder="Confirme a senha"
          secureTextEntry
          className="flex-1"
        />

        <AntDesign name="eye" size={20} color="#9C9C9C" />
      </View>
    </View>
  );
};

export default Step1;
