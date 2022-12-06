// @ts-nocheck
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";

const SelectedBook = ({ navigation }) => {
  const [play, setPlay] = useState(false);
  const [liked, setLiked] = useState(false);
  const {
    params: { title, image, author },
  } = useRoute();

  return (
    <View className="flex-1 bg-[#252525]">
      <View className="items-center px-4 flex-row justify-between mt-8 mb-12">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 flex-row items-center -ml-1"
          m
        >
          <Entypo name="chevron-left" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Detalhes</Text>
        </TouchableOpacity>

        <Text className="text-gray-300 font-bold flex-1 text-center text-xl">
          {title}
        </Text>

        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="language-outline" size={24} color="#D1D5DB" />
          <Text className="text-gray-300">Traduzir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        className="flex-1 px-4"
      >
        <Text className="text-[#e5e5e5] text-[16px] text-justify">
          {"  "}Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
          consequuntur modi et minima ab placeat dolore unde veniam ipsa enim
          voluptatem asperiores dolor vel quidem, iste beatae fugit quisquam
          maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sint, consequuntur modi et minima ab placeat dolore unde veniam ipsa
          enim voluptatem asperiores dolor vel quidem, iste beatae fugit
          quisquam maiores. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sint, consequuntur modi et minima ab placeat dolore unde veniam
          ipsa enim voluptatem asperiores dolor vel quidem, iste beatae fugit
          quisquam maiores. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sint, consequuntur modi et minima ab placeat dolore unde veniam
          ipsa enim voluptatem asperiores dolor vel quidem, iste beatae fugit
          quisquam maiores.
          {/* {"\n"}
          {"\n"}
          {"  "}Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
          consequuntur modi et minima ab placeat dolore unde veniam ipsa enim
          voluptatem asperiores dolor vel quidem, iste beatae fugit quisquam
          maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sint, consequuntur modi et minima ab placeat dolore unde veniam ipsa
          enim voluptatem asperiores dolor vel quidem, iste beatae fugit
          quisquam maiores. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sint, consequuntur modi et minima ab placeat dolore unde veniam
          ipsa enim voluptatem asperiores dolor vel quidem, iste beatae fugit
          quisquam maiores. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sint, consequuntur modi et minima ab placeat dolore unde veniam
          ipsa enim voluptatem asperiores dolor vel quidem, iste beatae fugit
          quisquam maiores. */}
        </Text>
      </ScrollView>

      <View className="border-t-[0.2px] bg-[#2c2c2c] flex-row justify-between items-center border-[#D1D5DB] h-16 px-5">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AudioPlayer", {
              image: image,
              title: title,
              author: author,
            })
          }
          className="flex-row items-center space-x-4"
        >
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            className="h-12 w-12 rounded"
          />
          <View>
            <Text className="text-[#f5f5f5] font-semibold">{title}</Text>
            <Text className="text-[#9CA3AF]">{author}</Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row items-center space-x-5">
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            {liked ? (
              <Ionicons name="heart" size={24} color="#AC0B13" />
            ) : (
              <Ionicons name="heart-outline" size={24} color="#f5f5f5" />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPlay(!play)}>
            {play ? (
              <FontAwesome name="pause" size={24} color="#f5f5f5" />
            ) : (
              <FontAwesome name="play" size={24} color="#f5f5f5" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectedBook;
