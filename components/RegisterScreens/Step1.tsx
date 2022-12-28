// @ts-nocheck
import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Step1Props {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  setName: () => void;
  setEmail: () => void;
  setPassword: () => void;
  setConfirmPassword: () => void;
}

const Step1 = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: Step1Props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        flexGrow: 1,
      }}
      className="mt-5"
    >
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
          secureTextEntry={hidePassword}
          className="flex-1"
        />

        <TouchableOpacity
          disabled={!password}
          onPress={() => setHidePassword(!hidePassword)}
        >
          {hidePassword ? (
            <Feather name="eye" size={20} color="#9C9C9C" />
          ) : (
            <Feather name="eye-off" size={20} color="#9C9C9C" />
          )}
        </TouchableOpacity>
      </View>

      <View
        className={`w-full mt-3 border h-14 ${
          confirmPassword != "" && confirmPassword === password
            ? "border-[#048444]"
            : "border-[#33333333]"
        } rounded bg-white flex-row items-center px-3`}
      >
        <TextInput
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
          placeholder="Confirme a senha"
          secureTextEntry={hideConfirmPassword}
          className="flex-1"
        />

        <TouchableOpacity
          disabled={!confirmPassword}
          onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
        >
          {hideConfirmPassword ? (
            <Feather name="eye" size={20} color="#9C9C9C" />
          ) : (
            <Feather name="eye-off" size={20} color="#9C9C9C" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Step1;
