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
  Platform,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Logo from "../../assets/images/logoOrange.png";
import Card from "../../assets/images/card.png";
import Step1 from "../../components/RegisterScreens/Step1";
import Step2 from "../../components/RegisterScreens/Step2";
import Step3 from "../../components/RegisterScreens/Step3";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { addDoc, collection } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSelected, setIsSelected] = useState();

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredentials) => {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        navigation.reset({
          routes: [{ name: "Actions" }],
        });
      }
    );
    setLoading(false);
  }

  async function handleAddCardToUser() {
    await addDoc(collection(db, "user"), {
      name: name,
      email: email,
      cards: {
        cardName: cardName,
        cardNumber: cardNumber,
        cvv: cvv,
        expiryDate: expiryDate,
      },
    })
      .then(() => {
        console.log("sucesso");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function finishRegister() {
    Promise.all([handleRegister(), handleAddCardToUser()]).then(
      ([registerResponse, cardResponse]) => {
        setLoading(false);
      }
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="height"
        className="h-screen px-3 bg[#f5f5f5]"
      >
        {page == 3 ? (
          <>
            <ImageBackground
              source={Card}
              className="w-full h-44 self-center mt-8 mb-3"
              imageStyle={{
                borderRadius: 8,
              }}
            >
              <Image
                source={{
                  uri: "https://logosmarcas.net/wp-content/uploads/2020/09/Mastercard-Logo.png",
                }}
                className="h-12 w-12 absolute right-3"
                resizeMode="contain"
              />

              <View className="absolute bottom-10 left-5">
                <Text className="text-lg text-[#f5f5f5] font-semibold">
                  {cardNumber}
                </Text>
              </View>

              <View className="absolute bottom-5 right-5">
                <Text className="text-[#f5f5f5] font-semibold">
                  {expiryDate}
                </Text>
              </View>

              <View className="absolute bottom-5 left-5">
                <Text className="text-[#f5f5f5] font-semibold">{cardName}</Text>
              </View>
            </ImageBackground>
          </>
        ) : (
          <>
            <Image
              source={Logo}
              className={`w-44 h-44 -mr-3 self-center ${
                Platform.OS === "android" ? "mt-7" : "mt-5"
              }`}
            />
          </>
        )}

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
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          ) : page == 2 ? (
            <Step2 isSelected={isSelected} setIsSelected={setIsSelected} />
          ) : (
            <Step3
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              cardName={cardName}
              setCardName={setCardName}
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              cvv={cvv}
              setCvv={setCvv}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (
              page == 1 &&
              name &&
              email &&
              password &&
              confirmPassword === password
            ) {
              setPage(page + 1);
            } else if (page == 2 && isSelected != undefined) {
              setPage(page + 1);
            } else if (
              page == 3 &&
              cardNumber &&
              cardName &&
              expiryDate &&
              cvv
            ) {
              finishRegister();
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
                    <Text className="text-[#f5f5f5] font-semibold text-lg">
                      Aguarde...
                    </Text>
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
