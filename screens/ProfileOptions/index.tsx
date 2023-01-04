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
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

const { height, width } = Dimensions.get("window");

const ProfileOptions = ({ navigation, route }) => {
  const { id, username, name, email, country, profilePic } = route.params;
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [newValues, setNewValues] = useState({
    username: "",
    email: "",
    name: "",
    country: "",
  });

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
    setLoading(true);
    try {
      await api.put(`/users/${id}`, newValues);

      await AsyncStorage.setItem("user", JSON.stringify(newValues));

      navigation.goBack();
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }

  async function deleteUser() {
    setDeleteLoading(true);
    try {
      await api.delete(`/users/${id}`);

      await AsyncStorage.removeItem("user");

      navigation.reset({
        routes: [{ name: "InitialScreen" }],
      });
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <KeyboardAvoidingView
          behavior="padding"
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

          <View className="self-center overflow-hidden bg-gray-500 p-2 justify-center mt-5 rounded-full items-center">
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
                    setNewValues((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  placeholder={email != "" ? email : "Email"}
                  className="flex-1"
                  placeholderTextColor={email != "" ? "#4C4C54" : "#ACACAC"}
                  keyboardType="email-address"
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
                  placeholder={country != null ? country : "País"}
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
                {loading ? (
                  <ActivityIndicator color="#f5f5f5" />
                ) : (
                  <>
                    <Text className="text-[#f5f5f5] font-semibold py-3">
                      Confirmar Alterações
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleModal}
                className="flex-1 items-center justify-center bg-transparent"
              >
                <Text className="text-red-500 font-semibold">
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

        <Modal
          onBackdropPress={toggleModal}
          isVisible={isModalVisible}
          className="items-center"
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInTiming={200}
          animationOutTiming={200}
        >
          <View
            style={{
              width: width / 1.5,
              height: height / 2,
            }}
            className="p-5 bg-[#f5f5f5] rounded-lg items-center justify-between"
          >
            <Text className="text-gray-600 font-semibold text-lg">
              Excluir conta?
            </Text>

            <Image
              source={{
                uri: "https://ouch-cdn2.icons8.com/xuRiM4wWLaCYPHku6ouyU9cxRxC4jVKk3zRYPevXKYw/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTEv/Zjk1OGQzMzktZmJm/NC00ZGFiLWE0ODMt/NjdkMzNhNzM2YzNi/LnN2Zw.png",
              }}
              resizeMode="contain"
              style={{
                height: height / 4,
                width: width / 2,
              }}
            />

            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={toggleModal}
                className="items-center justify-center flex-1 py-2 bg-[#F26E1D] rounded"
              >
                <Text className="text-base text-[#f5f5f5] font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={deleteUser}
                className="items-center justify-center py-2 flex-1 bg-transparent"
              >
                {deleteLoading ? (
                  <ActivityIndicator color="#252525" />
                ) : (
                  <>
                    <Text className="text-sm text-red-500 font-semibold">
                      Confirmar
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    </TouchableWithoutFeedback>
  );
};

export default ProfileOptions;
