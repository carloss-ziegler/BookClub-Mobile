// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Logo from "../../assets/images/logoOrange.png";
import Step1 from "../../components/RegisterScreens/Step1";
import Step2 from "../../components/RegisterScreens/Step2";
import Step3 from "../../components/RegisterScreens/Step3";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";

const RegisterScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredentials) => {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        navigation.reset({
          routes: [{ name: "InitialScreen" }],
        });
      }
    );
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView className="h-screen px-3 bg[#f5f5f5]">
        <Image
          source={Logo}
          className={`w-44 h-44 self-center ${
            Platform.OS === "android" ? "mt-7" : "mt-5"
          }`}
        />

        <View className="self-center items-center space-y-2 mb-3">
          <AntDesign name="checkcircleo" size={24} color="#048444" />
          <Text className="font-semibold text-lg">Passo {page} de 3</Text>
        </View>

        <View>
          {page == 1 ? (
            <Step1
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          ) : page == 2 ? (
            <Step2 />
          ) : (
            <Step3 />
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (page == 1 && name && email && password) {
              setPage(page + 1);
            } else if (page == 2) {
              setPage(page + 1);
            } else if (page == 3) {
              handleRegister();
            } else {
              alert("Preencha todos os campos!");
            }
          }}
          className="p-3 items-center justify-center mx-3 mb-3 bg-[#F26E1D] absolute bottom-0 right-0 left-0 rounded"
        >
          <Text className="text-[#f5f5f5] font-semibold text-lg">
            {page == 1 && <Text>Próximo</Text>}
            {page == 2 && <Text>Próximo</Text>}
            {page == 3 && (
              <>
                {loading ? (
                  <View className="flex-row items-center space-x-1">
                    <Text>Aguarde...</Text>
                    <ActivityIndicator color="#f5f5f5" />
                  </View>
                ) : (
                  <>
                    <Text>Finalizar Cadastro</Text>
                  </>
                )}
              </>
            )}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
