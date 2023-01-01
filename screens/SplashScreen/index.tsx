// @ts-nocheck
import { View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("user");

      if (token != null) {
        navigation.reset({
          routes: [{ name: "Actions" }],
        });
      } else {
        navigation.reset({
          routes: [{ name: "InitialScreen" }],
        });
      }
    };
    setTimeout(() => {
      checkToken();
    }, 2000);
  }, [navigation]);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user.displayName);
  //     setTimeout(() => {
  //       navigation.reset({
  //         routes: [{ name: "Actions" }],
  //       });
  //     }, 2000);
  //   } else {
  //     console.log("nenhum usuário");
  //     setTimeout(() => {
  //       navigation.reset({
  //         routes: [{ name: "InitialScreen" }],
  //       });
  //     }, 2000);
  //   }
  // });

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <LottieView
        ref={animation}
        autoPlay
        loop
        source={require("../../assets/99349-girl-with-books.json")}
        style={{ width: "100%", height: 350 }}
      />
    </View>
  );
};

export default SplashScreen;
