import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./screens/InitialScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { TabNavigation } from "./routes/tabNavigation";
import BookDetailScreen from "./screens/BookDetailScreen";
import AboutUs from "./screens/AboutUs";
import NewsScreen from "./screens/NewsScreen";
import SelectedBook from "./screens/SelectedBook";
import AudioPlayer from "./screens/AudioPlayer";
import SplashScreen from "./screens/SplashScreen";
import ChangePassword from "./screens/ChangePassword";
import Privacy from "./screens/Privacy";
import Terms from "./screens/Terms";
import CardScreen from "./screens/CardScreen";
import NewCard from "./screens/NewCard";
import CardDetails from "./screens/CardDetails";
import ProfileOptions from "./screens/ProfileOptions";
import UserContextProvider from "./contexts/userContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
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
              component={AboutUs}
              name="AboutUs"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={Privacy}
              name="Privacy"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={Terms}
              name="Terms"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={CardScreen}
              name="CardScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={NewCard}
              name="NewCard"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={CardDetails}
              name="CardDetails"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              component={ProfileOptions}
              name="ProfileOptions"
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
      </UserContextProvider>
    </QueryClientProvider>
  );
}
