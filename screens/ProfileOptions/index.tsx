// @ts-nocheck
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

const ProfileOptions = ({ navigation, route }) => {
  const { id, username, name, email, country, profilePic } = route.params;
  const [newValues, setNewValues] = useState({
    name: "",
    email: "",
    country: "",
    username: "",
  });
  const { isLoading, error, data } = useQuery(["users"], () => {});

  async function logout() {
    try {
      await api.post("/auth/logout");

      await AsyncStorage.removeItem("user");

      navigation.reset({
        routes: [{ name: "InitialScreen" }],
      });
    } catch (error) {
      alert(error);
    }
  }

  async function updateUser() {
    try {
      const res = await api.put(`/users/${id}`, newValues);
      console.log(res);

      await AsyncStorage.setItem("users", JSON.stringify(newValues));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="height"
        className="flex-1 bg-[#f5f5f5] px-4 py-6"
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
            Conta
          </Text>

          <View className="flex-1" />
        </View>

        <View className="self-center overflow-hidden bg-white p-2 justify-center mt-5 rounded-full items-center">
          <Image
            source={{
              uri: profilePic
                ? profilePic
                : "https://backoffice.freedomhint.com/uploads/images/profile_picture/mail_pro.png",
            }}
            className="w-20 h-20"
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity className="self-center mt-2">
          <Text className="text-[#F26E1D] font-semibold">Editar foto</Text>
        </TouchableOpacity>

        <View className="bg-white shadow self-center rounded-lg p-5 w-full mt-7">
          <View className="flex-row items-center space-x-2">
            <Text className="w-14 text-gray-500 font-semibold">Nome</Text>
            <View className="py-3 flex-1 border-b border-[#33333333] rounded items-center flex-row px-2">
              <TextInput
                value={newValues.username}
                onChangeText={(value) =>
                  setNewValues((prevState) => ({ ...prevState, name: value }))
                }
                placeholder={username != "" ? username : "Nome de usuário"}
                className="flex-1"
                placeholderTextColor={username != "" ? "#4C4C54" : "#ACACAC"}
              />
            </View>
          </View>

          <View className="flex-row items-center space-x-2">
            <Text className="w-14 text-gray-500 font-semibold">
              Nome de usuário
            </Text>
            <View className="py-3 flex-1 border-b border-[#33333333] rounded items-center flex-row px-2">
              <TextInput
                value={newValues.name}
                onChangeText={(value) =>
                  setNewValues((prevState) => ({ ...prevState, name: value }))
                }
                placeholder={name != "" ? name : "Nome"}
                className="flex-1"
                placeholderTextColor={name != "" ? "#4C4C54" : "#ACACAC"}
              />
            </View>
          </View>

          <View className="flex-row items-center space-x-2">
            <Text className="w-14 text-gray-500 font-semibold">Email</Text>
            <View className="py-3 border-b flex-1 border-[#33333333] rounded items-center flex-row px-2 mt-3">
              <TextInput
                value={newValues.email}
                onChangeText={(value) =>
                  setNewValues((prevState) => ({ ...prevState, email: value }))
                }
                placeholder={email != "" ? email : "Email"}
                className="flex-1"
                placeholderTextColor={email != "" ? "#4C4C54" : "#ACACAC"}
              />
            </View>
          </View>

          <View className="flex-row items-center space-x-2">
            <Text className="w-14 text-gray-500 font-semibold">Contato</Text>
            <View className="py-3 border-b flex-1 border-[#33333333] rounded items-center flex-row px-2 mt-3">
              <TextInput className="flex-1" placeholder="Telefone" />
            </View>
          </View>

          <View className="flex-row items-center space-x-2">
            <Text className="w-14 text-gray-500 font-semibold">País</Text>
            <View className="py-3 border-b flex-1 border-[#33333333] rounded items-center flex-row px-2 mt-3">
              <TextInput
                value={newValues.country}
                onChangeText={(value) =>
                  setNewValues((prevState) => ({
                    ...prevState,
                    country: value,
                  }))
                }
                placeholder={country != "" ? country : "País"}
                className="flex-1"
                placeholderTextColor={country != "" ? "#4C4C54" : "#ACACAC"}
              />
            </View>
          </View>

          <View className="flex-row items-center mt-6">
            <TouchableOpacity
              onPress={updateUser}
              className="flex-1 items-center justify-center bg-[#F26E1D] rounded"
            >
              <Text className="text-white font-semibold py-3">
                Confirmar Alterações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center justify-center bg-transparent">
              <Text className="text-[#F26E1D] font-semibold">
                Excluir Conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={logout}
          className="absolute bottom-10 right-0 left-0 items-center justify-center"
        >
          <Text className="text-gray-500 font-semibold text-lg">Sair</Text>
        </TouchableOpacity>

        <Text className="absolute bottom-5 right-0 left-0 text-center font-medium text-sm text-gray-400">
          Versão: 1.0.0
        </Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ProfileOptions;
