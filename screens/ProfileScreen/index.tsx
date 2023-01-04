// @ts-nocheck
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProps } from "../../utils/types";
import { api } from "../../utils/api";

const ProfileScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<UserProps[]>([]);
  const [notification, setNotification] = useState([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(
    notification?.includes(currentUser?.id) ? true : false
  );
  const toggleSwitchAdd = async () => {
    await api.post("/notifications?userId=" + currentUser?.id);
  };

  const toggleSwitchRemove = async () => {
    await api.post("/notifications?userId=" + currentUser?.id);
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await AsyncStorage.getItem("user");
      setCurrentUser(JSON.parse(res));
    };
    getUser();
  }, []);

  useEffect(() => {
    const getNotification = async () => {
      const res = await api.get("/notifications?userId=" + currentUser?.id);
      setNotification(res.data);
    };
    getNotification();
  }, []);

  return (
    <View className="flex-1 bg-[#f5f5f5] px-4 py-6 justify-between mt-4">
      <View className="flex-1 justify-start">
        <View className="flex-row items-center space-x-3 mt-5">
          <View className="bg-gray-500 overflow-hidden rounded-full">
            <Image
              source={{
                uri: currentUser.profilePic
                  ? currentUser.profilePic
                  : "https://backoffice.freedomhint.com/uploads/images/profile_picture/mail_pro.png",
              }}
              className="w-14 h-14 rounded-lg"
              resizeMode="contain"
            />
          </View>

          <View className="max-w-[250px]">
            <Text className="text-[#F26E1D] font-semibold text-xl">
              {currentUser?.name}
            </Text>
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
            onPress={() =>
              navigation.navigate("CardScreen", {
                userId: currentUser.id,
                name: currentUser.name,
                profilePic: currentUser.profilePic,
              })
            }
            className="flex-row items-center justify-between"
          >
            <Text className="text-gray-600 font-medium">
              Alterar forma de pagamento
            </Text>
            <AntDesign name="plus" size={20} color="#444C4C" />
          </TouchableOpacity>

          {currentUser.email === "admin@gmail.com" && (
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
              onValueChange=""
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

          <TouchableOpacity
            className="flex-row items-center justify-between"
            onPress={() =>
              navigation.navigate("ProfileOptions", {
                id: currentUser.id,
                username: currentUser.username,
                name: currentUser.name,
                email: currentUser.email,
                country: currentUser.country,
                profilePic: currentUser.profilePic,
              })
            }
          >
            <Text>Configurações de Conta</Text>
            <Entypo name="chevron-right" size={20} color="#444C4C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
