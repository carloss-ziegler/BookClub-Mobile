// @ts-nocheck
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const AudioPlayer = ({ navigation }) => {
  const [play, setPlay] = useState(false);
  const {
    params: { title, image, author },
  } = useRoute();

  return (
    <View className="flex-1 bg-[#252525]">
      <View
        className={`items-center px-4 flex-row justify-between ${
          Platform.OS === "ios" ? "mt-5" : "mt-10"
        } mb-5`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 flex-row items-center -ml-1"
          m
        >
          <Entypo name="chevron-down" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Leitura</Text>
        </TouchableOpacity>

        <Text className="text-gray-300 font-bold flex-1 text-center text-xl">
          Audio Book
        </Text>

        <View className="flex-1 items-center justify-end flex-row space-x-6">
          <TouchableOpacity>
            <MaterialIcons name="connected-tv" size={24} color="#f5f5f5" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#f5f5f5"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="self-center flex-1">
        <View className="">
          <Image
            source={{ uri: image }}
            className="w-80 h-80 rounded mb-4"
            resizeMode="cover"
          />

          <View className="">
            <View className="flex-row items-center justify-between">
              <Feather name="thumbs-down" size={20} color="#D1D5DB" />

              <Text className="text-[#f5f5f5] text-xl font-bold">{title}</Text>

              <Feather name="thumbs-up" size={20} color="#D1D5DB" />
            </View>
            <Text className="text-center text-gray-400">{author}</Text>
          </View>
        </View>

        <View className="mt-6 mb-12 h-4 self-center justify-center">
          <Slider
            style={{
              width: 300,
              height: 2,
            }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#f5f5f5"
            maximumTrackTintColor="#898f9b"
          />
        </View>

        <View className="flex-row items-center justify-between">
          <TouchableOpacity>
            <AntDesign name="arrowsalt" size={20} color="#f5f5f5" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialIcons name="skip-previous" size={32} color="#f5f5f5" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPlay(!play)} className="-mr-2">
            {play ? (
              <FontAwesome name="pause" size={40} color="#f5f5f5" />
            ) : (
              <FontAwesome name="play" size={40} color="#f5f5f5" />
            )}
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialIcons name="skip-next" size={32} color="#f5f5f5" />
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome5 name="volume-mute" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-20 bg-[#363636] rounded-t-xl">
        <View className="self-center mt-2 bg-[#a7a8aa] w-7 rounded h-1" />

        <View className="self-center mt-6 flex-row items-center space-x-8">
          <Text className="text-[#D1D5DB]">PRÓXIMO</Text>
          <Text className="text-[#D1D5DB]">SOBRE</Text>
          <Text className="text-[#D1D5DB]">RELACIONADOS</Text>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
