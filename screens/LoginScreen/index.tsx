// @ts-nocheck
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../contexts/userContext";

const LoginScreen = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();
  const [inputs, setInputs] = useState<object>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", inputs, {
        withCredentials: true,
      });

      await AsyncStorage.setItem("user", JSON.stringify(res.data));

      userDispatch({
        type: "setName",
        payload: {
          name: inputs.username,
        },
      });

      navigation.reset({
        routes: [{ name: "Actions" }],
      });
      setLoading(false);
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="h-screen px-3 bg[#f5f5f5]">
        <Image
          source={require("../../assets/images/logoOrange.png")}
          className={`w-60 h-60 self-center -mr-1 ${
            Platform.OS === "android" && "mt-7"
          }`}
          resizeMode="cover"
        />

        <Text className="font-semibold text-4xl">Login</Text>

        <View className="mt-2 py-4 space-y-4">
          <View className="border border-[#cccccccc] bg-white rounded flex-row items-center justify-between h-14 px-3">
            <View className="flex-row items-center space-x-2">
              <AntDesign name="user" size={24} color="gray" />

              <TextInput
                value={inputs.username}
                onChangeText={(text) =>
                  setInputs((prevState) => ({ ...prevState, username: text }))
                }
                placeholder="username"
                className="flex-grow-1 max-w-xs"
                returnKeyType="next"
                returnKeyLabel="Próximo"
                autoFocus
              />
            </View>

            <TouchableOpacity
              onPress={() =>
                setInputs((prevState) => ({ ...prevState, username: "" }))
              }
            >
              <AntDesign name="closecircle" size={16} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="border border-[#cccccccc] bg-white rounded flex-row items-center justify-between h-14 px-3">
            <View className="flex-row items-center space-x-2">
              <FontAwesome5 name="lock" size={24} color="gray" />

              <TextInput
                value={inputs.password}
                onChangeText={(text) =>
                  setInputs((prevState) => ({ ...prevState, password: text }))
                }
                placeholder="Senha"
                className="flex-grow-1 max-w-xs"
                secureTextEntry
                returnKeyType="send"
                returnKeyLabel="Enviar"
                onSubmitEditing={handleLogin}
              />
            </View>

            <Ionicons name="eye" size={20} color="gray" />
          </View>
        </View>

        {error && (
          <Text className="text-center text-red-500 font-semibold">
            {error}
          </Text>
        )}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-[#F26E1D] rounded mt-8 w-full py-3 self-center items-center justify-center"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-lg">Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          className="self-center mt-4"
        >
          <Text>
            Não possui uma conta?{" "}
            <Text className="text-[#F26E1D]">Registrar-se</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-2">
          <Text className="self-center text-[#F26E1D]">
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
