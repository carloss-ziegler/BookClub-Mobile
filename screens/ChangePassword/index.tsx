// @ts-nocheck
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";

const ChangePassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 bg-[#f5f5f5] px-4 py-6 mt-4"
      >
        <View className="items-center flex-row justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-1 flex-row items-center -ml-1"
          >
            <Entypo name="chevron-left" size={32} color="#F26E1D" />
            <Text className="text-[#F26E1D] text-lg">Perfil</Text>
          </TouchableOpacity>

          <Text className="text-gray-500 font-bold flex-1 text-center text-xl">
            Alterar senha
          </Text>

          <View className="flex-1" />
        </View>

        <View className="flex-row items-center space-x-2 mt-5">
          <Image
            source={{
              uri: "https://backoffice.freedomhint.com/uploads/images/profile_picture/mail_pro.png",
            }}
            className="w-14 h-14 rounded-lg"
            resizeMode="cover"
          />
          <View className="max-w-[250px]">
            <Text className="text-[#F26E1D] font-semibold text-xl">Nome</Text>
            <Text className="text-gray-500">email</Text>
          </View>
        </View>

        <View className="flex-1 justify-center">
          <View className="p-3 rounded-lg bg-white shadow">
            <Text className="text-gray-400 text-lg">
              Configurações de conta
            </Text>
            <View className="mt-8">
              <Text className="text-lg text-gray-600">
                Informe a senha atual
              </Text>

              <View className="mt-2 flex-row items-center justify-between w-full border border-[#cccccccc] bg-[#e5e5e5] py-3 px-2 rounded">
                <TextInput
                  className="w-[80%]"
                  secureTextEntry
                  placeholder="Senha atual"
                />

                <Ionicons name="eye" size={20} color="#252525" />
              </View>
            </View>

            <View className="mt-8">
              <Text className="text-lg text-gray-600">Nova senha</Text>

              <View className="mt-2 flex-row items-center justify-between w-full border border-[#cccccccc] bg-[#e5e5e5] py-3 px-2 rounded">
                <TextInput
                  className="w-[80%]"
                  secureTextEntry
                  placeholder="Nova senha"
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                />

                <Ionicons name="eye" size={20} color="#252525" />
              </View>

              <View className="mt-4 flex-row items-center justify-between w-full border border-[#cccccccc] bg-[#e5e5e5] py-3 px-2 rounded">
                <TextInput
                  className="w-[80%]"
                  secureTextEntry
                  placeholder="Confirme a senha"
                />

                <Ionicons name="eye" size={20} color="#252525" />
              </View>
            </View>

            <TouchableOpacity
              onPress=""
              className="w-full mt-5 py-3 items-center justify-center bg-[#F26E1D] rounded"
            >
              {loading ? (
                <Text className="text-white text-lg font-semibold">
                  Alterar senha <ActivityIndicator color="#fff" />
                </Text>
              ) : (
                <Text className="text-white text-lg font-semibold">
                  Alterar senha
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
