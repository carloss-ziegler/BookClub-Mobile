import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./screens/InitialScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { TabNavigation } from "./routes/tabNavigation";
import BookDetailScreen from "./screens/BookDetailScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import NewsScreen from "./screens/NewsScreen";
import SelectedBook from "./screens/SelectedBook";
import AudioPlayer from "./screens/AudioPlayer";
import SplashScreen from "./screens/SplashScreen";
import ChangePassword from "./screens/ChangePassword";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={SplashScreen}
          name="SplashScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={InitialScreen}
          name="InitialScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={LoginScreen}
          name="LoginScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={RegisterScreen}
          name="RegisterScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={TabNavigation}
          name="Actions"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ChangePassword}
          name="ChangePassword"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={BookDetailScreen}
          name="BookDetail"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          component={NewsScreen}
          name="NewsScreen"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          component={SelectedBook}
          name="SelectedBook"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={AudioPlayer}
          name="AudioPlayer"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack.Navigator>

      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
