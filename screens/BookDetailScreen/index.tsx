// @ts-nocheck
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const BookDetailScreen = ({ navigation }) => {
  const [wantToRead, setWantToRead] = useState(false);

  const {
    params: { title, image, author, stars },
  } = useRoute();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 25 }}
      className="flex-1 bg-[#f5f5f5] px-5"
    >
      <View className="flex-row item-center justify-between mt-8">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-down" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Início</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart" size={32} color="#AC0B13" />
        </TouchableOpacity>
      </View>

      <View className="self-center items-center">
        <Image
          source={{
            uri: image,
          }}
          className="h-64 w-48 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-lg font-semibold mt-2">{title}</Text>
        <Text className="text-sm font-normal text-gray-400">{author}</Text>

        <View className="flex-row items-center mt-2">
          <Ionicons name="star" size={18} color="#FFCE31" />
          <Ionicons name="star" size={18} color="#FFCE31" />
          <Ionicons name="star" size={18} color="#FFCE31" />
          <Ionicons name="star" size={18} color="#FFCE31" />
          <Text className="ml-1 text-gray-400">{stars}</Text>
        </View>

        <TouchableOpacity
          onPress={async () => {
            setWantToRead(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setWantToRead(false);
            navigation.navigate("SelectedBook", {
              title: title,
              author: author,
              image: image,
            });
          }}
          className="mt-3 bg-[#F26E1D] px-5 py-3 rounded-lg"
        >
          {wantToRead ? (
            <View className="items-center flex-row space-x-1">
              <Text className="text-white font-semibold">Ler Agora</Text>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <Text className="text-white font-semibold">Ler Agora</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-2 space-y-2">
        <Text className="text-2xl font-semibold">Sobre o autor</Text>
        <Text className="text-sm text-gray-400">
          {"    "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
          accusamus culpa commodi praesentium temporibus aspernatur blanditiis
          velit nulla quae ipsam? At laudantium, quibusdam corrupti temporibus
          et quaerat voluptas numquam excepturi?
        </Text>
      </View>

      <View className="mt-5 space-y-2">
        <Text className="text-2xl font-semibold">Visão Geral</Text>
        <Text className="text-sm text-gray-400">
          {"    "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
          accusamus culpa commodi praesentium temporibus aspernatur blanditiis
          velit nulla quae ipsam? At laudantium, quibusdam corrupti temporibus
          et quaerat voluptas numquam excepturi?
        </Text>
      </View>
    </ScrollView>
  );
};

export default BookDetailScreen;
