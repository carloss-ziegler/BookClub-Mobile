// @ts-nocheck
import { View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

const SplashScreen = ({ navigation }) => {
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName);
        setTimeout(() => {
          navigation.replace("Actions");
        }, 2000);
      } else {
        console.log("nenhum usuário");
        setTimeout(() => {
          navigation.replace("InitialScreen");
        }, 2000);
      }
    });
  }, [navigation]);

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
