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
import React, { useEffect, useState, useRef } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProps } from "../../utils/types";
import LottieView from "lottie-react-native";

const FavoriteScreen = ({ navigation }) => {
  const [user, setUser] = useState<UserProps[]>([]);
  const [pressed, setPressed] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const animation = useRef(null);

  const { isLoading, error, data } = useQuery(["favorites", user.id], () =>
    api.get("/favorites?userId=" + user.id).then((res) => {
      return res.data;
    })
  );

  useEffect(() => {
    animation.current?.play();
    const getUser = async () => {
      const res = await AsyncStorage.getItem("user");
      setUser(JSON.parse(res));
    };
    getUser();
  }, []);

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
          {data?.length < 1 && <Text>Nenhum livro favoritado</Text>}
          {data?.length > 0 && <>{data?.length} livros favoritados</>}
        </Text>
        <Entypo name="open-book" size={28} color="#F26E1D" />
      </View>

      {data?.length < 1 ? (
        <View className="flex-1 items-center justify-center">
          <LottieView
            ref={animation}
            autoPlay
            loop
            source={require("../../assets/106964-shake-a-empty-box.json")}
            style={{
              width: "100%",
              height: 300,
            }}
          />

          <Text className="mt-3 text-center text-gray-600 font-semibold text-lg">
            Ainda não há livros favoritados.
          </Text>
          <Text className="text-gray-400 text-center font-medium text-sm">
            Comece favoritando seu primeiro livro!
          </Text>
        </View>
      ) : (
        <>
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <Text>Carregando...</Text>
            </View>
          ) : (
            <FlatList
              data={data}
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
                        source={{ uri: book?.thumbnail }}
                        className="h-28 w-20 rounded"
                      />

                      <View className="self-center w-32">
                        <Text className="text-gray-600 font-semibold text-lg">
                          {book?.title}
                        </Text>
                        <Text className="text-gray-400 text-sm">
                          {book?.author}
                        </Text>
                      </View>
                    </View>

                    <View className="self-center flex-row items-center space-x-2">
                      <TouchableOpacity
                        onPress={async () => {
                          setLoading(true);
                          await new Promise((resolve) =>
                            setTimeout(resolve, 2500)
                          );
                          setLoading(false);
                          setPressed(book?.id);
                        }}
                      >
                        {loading ? (
                          <ActivityIndicator color="gray" />
                        ) : (
                          <>
                            {pressed == book?.id ? (
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
          )}
        </>
      )}
    </View>
  );
};

export default FavoriteScreen;
