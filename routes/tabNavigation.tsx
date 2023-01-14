import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Octicons, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <Octicons name="home" size={20} color={color} />;
            }
            return <Octicons name="home" size={20} color="#747C7C" />;
          },
          tabBarLabel: "Início",
          tabBarActiveTintColor: "#F26E1D",
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
          tabLongPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        })}
      />

      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <Ionicons name="ios-heart" size={24} color={color} />;
            }
            return <Ionicons name="heart-outline" size={24} color="#747C7C" />;
          },
          tabBarLabel: "Favoritos",
          tabBarActiveTintColor: "#F26E1D",
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
          tabLongPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        })}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <Ionicons name="ios-person" size={20} color={color} />;
            }
            return <Ionicons name="person-outline" size={20} color="#747C7C" />;
          },
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: "#F26E1D",
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
          tabLongPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        })}
      />
    </Tab.Navigator>
  );
};
