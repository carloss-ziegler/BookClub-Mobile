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
          navigation.replace("Actions");
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
          <View className="border border-[#cccccccc] bg-white rounded flex-row items-center justify-between py-3 px-2">
            <View className="flex-row items-center space-x-2">
              <AntDesign name="user" size={24} color="gray" />

              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                className="w-72"
                keyboardType="email-address"
                returnKeyType="next"
                returnKeyLabel="Próximo"
              />
            </View>

            <AntDesign name="closecircle" size={16} color="gray" />
          </View>

          <View className="border border-[#cccccccc] bg-white rounded flex-row items-center justify-between px-2 py-3">
            <View className="flex-row items-center space-x-2">
              <FontAwesome5 name="lock" size={24} color="gray" />

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Senha"
                className="w-72"
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

        <Text className="self-center mt-4">
          Não possui uma conta?{" "}
          <TouchableOpacity
            onPress={() => navigation.navigation("RegisterScreen")}
          >
            <Text className="text-[#F26E1D]">Registrar-se</Text>
          </TouchableOpacity>
        </Text>

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
