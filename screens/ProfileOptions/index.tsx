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
import { auth } from "../../services/firebase";
import { deleteUser, signOut, updateCurrentUser } from "firebase/auth";

const ProfileOptions = ({ navigation }) => {
  const name = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  async function handleLogout() {
    await signOut(auth)
      .then(() => {
        console.log("Saiu");
        navigation.reset({
          routes: [{ name: "InitialScreen" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteAccount() {
    await deleteUser(auth.currentUser)
      .then(() => {
        console.log("sucesso");
      })
      .catch((error) => {
        console.log(error.message);
      });
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

        <View className="self-center items-center">
          <Image
            source={{
              uri: "https://backoffice.freedomhint.com/uploads/images/profile_picture/mail_pro.png",
            }}
            className="w-28 h-28 mt-10"
          />

          <Text className="text-center mt-2 font-semibold text-[#F26E1D] text-lg">
            {name}
          </Text>
          <Text className="text-center font-medium text-sm text-gray-400">
            {email}
          </Text>
        </View>

        <View className="bg-white shadow self-center rounded-lg p-5 w-full mt-7">
          <View className="h-12 border border-[#33333333] rounded items-center flex-row px-2">
            <TextInput
              value={newName}
              onChangeText={(value) => setNewName(value)}
              placeholder="Nome de usuário"
              className="flex-1"
            />
          </View>

          <View className="h-12 border border-[#33333333] rounded items-center flex-row px-2 mt-3">
            <TextInput
              value={newEmail}
              onChangeText={(value) => setNewEmail(value)}
              placeholder="Email"
              className="flex-1"
            />
          </View>

          <View className="flex-row items-center mt-6">
            <TouchableOpacity className="flex-1 items-center justify-center bg-[#F26E1D] rounded">
              <Text className="text-white font-semibold py-3">
                Confirmar Alterações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={deleteAccount}
              className="flex-1 items-center justify-center bg-transparent"
            >
              <Text className="text-[#F26E1D] font-semibold">
                Excluir Conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="absolute bottom-10 right-0 left-0 items-center justify-center"
        >
          <Text className="text-red-500 font-semibold text-lg">
            Sair de {email}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ProfileOptions;
