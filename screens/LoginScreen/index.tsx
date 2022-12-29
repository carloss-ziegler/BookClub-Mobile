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
import React, { useState } from "react";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (email && password) {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);
          navigation.reset({
            routes: [{ name: "Actions" }],
          });
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView className="h-screen px-3 bg[#f5f5f5]">
        <Image
          source={require("../../assets/images/logoOrange.png")}
          className={`w-60 h-60 self-center ${
            Platform.OS === "android" && "mt-7"
          }`}
        />

        <Text className="font-semibold text-4xl">Login</Text>

        <View className="mt-2 py-4 space-y-4">
          <View className="border border-[#cccccccc] bg-white rounded flex-row items-center justify-between h-14 px-3">
            <View className="flex-row items-center space-x-2">
              <AntDesign name="user" size={24} color="gray" />

              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                className="flex-grow-1 max-w-xs"
                keyboardType="email-address"
                returnKeyType="next"
                returnKeyLabel="Próximo"
                autoFocus
              />
            </View>

            <TouchableOpacity onPress={() => setEmail("")}>
              <AntDesign name="closecircle" size={16} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="border border-[#cccccccc] bg-white rounded flex-row items-center justify-between h-14 px-3">
            <View className="flex-row items-center space-x-2">
              <FontAwesome5 name="lock" size={24} color="gray" />

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Senha"
                className="flex-grow-1 max-w-xs"
                secureTextEntry
                returnKeyType="send"
                returnKeyLabel="Enviar"
                onSubmitEditing={login}
              />
            </View>

            <Ionicons name="eye" size={20} color="gray" />
          </View>
        </View>

        <TouchableOpacity
          onPress={login}
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
