// @ts-nocheck
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Books } from "../../mocks/Books";

const FavoriteScreen = ({ navigation }) => {
  const [books] = useState(Books);
  const [pressed, setPressed] = useState(false);
  const [favorited, setFavorited] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <View className="flex-1 bg-[#e5e5e5] p-5">
      <View className="items-center flex-row justify-between mt-5 mb-12">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 flex-row items-center -ml-1"
        >
          <Entypo name="chevron-left" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Início</Text>
        </TouchableOpacity>

        <Text className="text-gray-500 font-bold flex-1 text-center text-xl">
          Favoritos
        </Text>

        <View className="flex-1" />
      </View>

      <View className="space-y-1 mt-5 items-center justify-between flex-row">
        <Text className="text-gray-500 text-lg">
          {books.length} livros favoritados
        </Text>
        <Entypo name="open-book" size={28} color="#F26E1D" />
      </View>

      <FlatList
        data={books}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 16 }}
        contentContainerStyle={{ marginTop: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item: book, index }) => {
          return (
            <View className="flex-row justify-between mr-1 mb-4 p-2 shadow bg-[#f5f5f5] rounded">
              <View className="flex-row space-x-3">
                <Image
                  resizeMode="cover"
                  source={{ uri: book.imageUrl }}
                  className="h-28 w-20 rounded"
                />

                <View className="self-center w-32">
                  <Text className="text-gray-600 font-semibold text-lg">
                    {book.title}
                  </Text>
                  <Text className="text-gray-400 text-sm">{book.author}</Text>
                </View>
              </View>

              <View className="self-center flex-row items-center space-x-2">
                <TouchableOpacity
                  onPress={() => {
                    setFavorited(index);
                  }}
                >
                  {favorited == book.id ? (
                    <Ionicons name="heart" size={24} color="#AC0B13" />
                  ) : (
                    <Ionicons name="heart-outline" size={24} color="gray" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    setLoading(true);
                    await new Promise((resolve) => setTimeout(resolve, 2500));
                    setLoading(false);
                    setPressed(index);
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="gray" />
                  ) : (
                    <>
                      {pressed == book.id ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="#048444"
                        />
                      ) : (
                        <Ionicons
                          name="download-outline"
                          size={24}
                          color="gray"
                        />
                      )}
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default FavoriteScreen;
