// @ts-nocheck
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Genres } from "../../mocks/Genres";
import { Books } from "../../mocks/Books";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [genres] = useState(Genres);
  const [books] = useState(Books);
  const navigation = useNavigation();

  return (
    <View className="bg-[#f5f5f5] px-4">
      <View className="flex-row items-center justify-between mt-10">
        <TouchableOpacity>
          <MaterialIcons name="menu-open" size={32} color="black" />
        </TouchableOpacity>

        <View className="flex-row items-center space-x-3">
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("NewsScreen")}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={28}
                color="black"
              />
            </TouchableOpacity>
            <View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F26E1D]" />
          </View>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://backoffice.freedomhint.com/uploads/images/profile_picture/mail_pro.png",
              }}
              className="w-10 h-10 rounded-full bg-gray-500"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-4 space-y-1">
        <Text className="text-gray-600 font-semibold text-2xl">
          Olá, <Text className="text-[#F26E1D]">André Lima</Text>
        </Text>
        <Text className="text-gray-600 font-semibold">
          O que você quer ler hoje?
        </Text>
      </View>

      <View className="flex-row items-center justify-between border border-[#cccccccc] bg-white p-3 rounded mt-4">
        <View className="flex-row items-center space-x-2">
          <Octicons name="search" size={20} color="gray" />
          <TextInput
            placeholder="Buscar por autor, título, gênero..."
            className="w-64"
          />
        </View>

        <View className="flex-row items-center space-x-2">
          <TouchableOpacity>
            <SimpleLineIcons name="microphone" size={20} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ios-filter" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ marginTop: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {genres.map((genre) => (
          <TouchableOpacity key={genre.id} className="mr-3">
            <Text className="text-lg text-gray-500 font-medium">
              {genre.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={{ marginTop: 16 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: "#f5f5f5" }}
      >
        {books.map((book) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BookDetail", {
                title: book.title,
                image: book.imageUrl,
                author: book.author,
                stars: book.stars,
              });
            }}
            className="mr-3 w-32 h-66 bg-[#f5f5f5]"
            key={book.id}
          >
            <Image
              source={{ uri: book.imageUrl }}
              className="h-48 w-32 rounded-lg"
              resizeMode="cover"
            />

            <Text className="text-gray-600 font-semibold text-base">
              {book.title}
            </Text>

            <Text className="text-xs text-gray-400 font-medium">
              {book.author}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text className="text-2xl mt-6 text-gray-600 font-semibold">
        Lançamentos
      </Text>

      <View className="h-48 bg-[#f5f5f5]"></View>
    </View>
  );
};

export default HomeScreen;
