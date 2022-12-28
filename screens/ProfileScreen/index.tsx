// @ts-nocheck
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const ProfileScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const userEmail = auth.currentUser?.email;
  const userName = auth.currentUser?.displayName;

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

  return (
    <View className="flex-1 bg-[#f5f5f5] px-4 py-6 justify-between mt-4">
      <View className="flex-1 justify-start">
        <View className="flex-row items-center space-x-2 mt-5">
          <Image
            source={{
              uri: "https://backoffice.freedomhint.com/uploads/images/profile_picture/mail_pro.png",
            }}
            className="w-14 h-14 rounded-lg"
            resizeMode="cover"
          />
          <View>
            <Text className="text-[#F26E1D] font-semibold text-xl">
              {userName}
            </Text>
            <Text className="text-gray-500">{userEmail}</Text>
          </View>
        </View>
        <View className="space-y-8 mt-10">
          <Text className="text-gray-400">Configurações de conta</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
            className="flex-row items-center justify-between"
          >
            <Text className="text-gray-600 font-medium">Alterar senha</Text>
            <Entypo name="chevron-right" size={20} color="#444C4C" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CardScreen")}
            className="flex-row items-center justify-between"
          >
            <Text className="text-gray-600 font-medium">
              Alterar forma de pagamento
            </Text>
            <AntDesign name="plus" size={20} color="#444C4C" />
          </TouchableOpacity>

          {userEmail === "admin@gmail.com" && (
            <TouchableOpacity className="flex-row items-center justify-between">
              <Text className="text-gray-600 font-medium">
                Cadastrar produtos
              </Text>
              <AntDesign name="plus" size={20} color="#444C4C" />
            </TouchableOpacity>
          )}

          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-600 font-medium">
              Ativar notificações
            </Text>
            <Switch
              trackColor={{ false: "#99999999", true: "#F26E1D" }}
              thumbColor={isEnabled ? "#f5f5f5" : "#f4f3f4"}
              ios_backgroundColor="#99999999"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 justify-end">
        <View className="space-y-6">
          <Text className="text-gray-400">Mais</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("AboutUs")}
            className="flex-row items-center justify-between"
          >
            <Text>Sobre nós</Text>
            <Entypo name="chevron-right" size={20} color="#444C4C" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Privacy")}
            className="flex-row items-center justify-between"
          >
            <Text>Política de privacidade</Text>
            <Entypo name="chevron-right" size={20} color="#444C4C" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Terms")}
            className="flex-row items-center justify-between"
          >
            <Text>Termos e condições</Text>
            <Entypo name="chevron-right" size={20} color="#444C4C" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <Text className="text-red-600 text-lg">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
