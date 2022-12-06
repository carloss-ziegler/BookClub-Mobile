import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProfileScreen from "../screens/ProfileScreen";
const Tab = createBottomTabNavigator();
import { Octicons, Ionicons } from "@expo/vector-icons";

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
              return <Octicons name="home" size={24} color={color} />;
            }
            return <Octicons name="home" size={24} color="#747C7C" />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#F26E1D",
        }}
      />

      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <Ionicons name="ios-heart" size={28} color={color} />;
            }
            return <Ionicons name="heart-outline" size={28} color="#747C7C" />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#F26E1D",
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <Ionicons name="ios-person" size={24} color={color} />;
            }
            return <Ionicons name="person-outline" size={24} color="#747C7C" />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#F26E1D",
        }}
      />
    </Tab.Navigator>
  );
};
