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
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Books } from "../../mocks/Books";

const NewsScreen = ({ navigation }) => {
  const [books] = useState(Books);

  return (
    <View className="flex-1 bg-[#e5e5e5] p-5">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className={Platform.OS === "android" && "mt-10"}
      >
        <Ionicons name="arrow-back-outline" size={32} color="black" />
      </TouchableOpacity>

      <Text className="text-gray-600 font-semibold text-2xl mt-5">
        Novidades
      </Text>

      <FlatList
        data={books}
        style={{ marginTop: 24 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item: book }) => {
          return (
            <View className="flex-row space-x-3 mb-4 p-2 shadow bg-[#f5f5f5] rounded">
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
                <Text className="text-gray-400 text-xs">
                  Adicionado há 2 semanas
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default NewsScreen;
