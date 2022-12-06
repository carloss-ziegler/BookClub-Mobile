// @ts-nocheck
import { View, Text, TouchableOpacity, Platform, FlatList } from "react-native";
import React, { useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Books } from "../../mocks/Books";

const FavoriteScreen = ({ navigation }) => {
  const [books] = useState(Books);

  return (
    <View className="flex-1 bg-[#f5f5f5] p-5">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mt-10">
        <Ionicons name="arrow-back-outline" size={32} color="black" />
      </TouchableOpacity>

      <View className="space-y-1 mt-5 items-center justify-between flex-row">
        <View>
          <Text className="text-gray-600 font-semibold text-2xl">
            Favoritos
          </Text>
          <Text className="text-gray-400 text-sm">3 livros favoritados</Text>
        </View>
        <Entypo name="open-book" size={28} color="#F26E1D" />
      </View>

      <FlatList
        data={books}
        style={{ marginTop: 24 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item: book }) => {
          return (
            <View>
              <Text>{book.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default FavoriteScreen;
