// @ts-nocheck
import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const BookDetailScreen = () => {
  const navigation = useNavigation();

  const {
    params: { title, image, author, stars },
  } = useRoute();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 25 }}
      className="flex-1 bg-[#f5f5f5] px-5"
    >
      <View className="flex-row item-center justify-between mt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={32} color="black" />
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

        <TouchableOpacity className="mt-3 bg-[#F26E1D] px-5 py-3 rounded-lg">
          <Text className="text-white font-semibold">Ler Agora</Text>
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
