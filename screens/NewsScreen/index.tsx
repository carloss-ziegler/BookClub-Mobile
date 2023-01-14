// @ts-nocheck
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const NewsScreen = ({ navigation }) => {
  const [books] = useState([]);

  return (
    <View className="flex-1 bg-[#e5e5e5] p-5">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className={`${
          Platform.OS === "android" && "mt-10"
        } mb-5 flex-row items-center`}
      >
        <Entypo name="chevron-down" size={32} color="#F26E1D" />
        <Text className="text-[#F26E1D] text-lg">Início</Text>
      </TouchableOpacity>

      <View className="flex-row items-center justify-between my-5">
        <Text className="text-gray-600 font-semibold text-2xl">Novidades</Text>
        <MaterialCommunityIcons
          name="newspaper-check"
          size={28}
          color="#F26E1D"
        />
      </View>

      <FlatList
        data={books}
        style={{ marginTop: 16 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: 20, paddingBottom: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item: book }) => {
          return (
            <View className="flex-row mr-1 space-x-3 mb-4 p-2 shadow bg-[#f5f5f5] rounded">
              <Image
                source={{ uri: book.imageUrl }}
                resizeMode="cover"
                className="h-28 w-20 rounded"
              />
              <View className="justify-between flex-1">
                <View className="justify-between flex-row">
                  <View>
                    <Text className="text-gray-600 font-semibold text-lg">
                      {book.title}
                    </Text>
                    <Text className="text-gray-400 text-sm">{book.author}</Text>
                  </View>
                  <Entypo name="dots-three-vertical" size={20} color="#ccc" />
                </View>
                <View className="flex-row items-center space-x-1">
                  <MaterialCommunityIcons
                    name="clock-check-outline"
                    size={20}
                    color="#048444"
                    className="opacity-40"
                  />
                  <Text className="text-[#048444] opacity-50 text-xs">
                    Adicionado há 2 semanas
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default NewsScreen;
