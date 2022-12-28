// @ts-nocheck
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Genres } from "../../mocks/Genres";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [genres] = useState(Genres);
  const [books, setBooks] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email);
      setUserName(user?.displayName);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBooks(list);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View className="bg-[#f5f5f5] px-4">
      <View className="flex-row items-center justify-between mt-10">
        <View className="mt-4 space-y-1">
          {userEmail === "admin@gmail.com" ? (
            <Text className="text-gray-600 font-semibold text-2xl">
              Bem vindo, <Text className="text-[#F26E1D]">Administrador</Text>!
            </Text>
          ) : (
            <>
              <Text className="text-gray-600 font-semibold text-2xl">
                Olá, <Text className="text-[#F26E1D]">{userName}</Text>!
              </Text>
              <Text className="text-gray-600 font-semibold">
                O que você quer ler hoje?
              </Text>
            </>
          )}
        </View>

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

      {loading ? (
        <View className="self-center mt-5">
          <ActivityIndicator color="#F26E1D" size="large" />
        </View>
      ) : (
        <ScrollView
          style={{ marginTop: 16 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: "#f5f5f5" }}
        >
          {books?.map((book) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BookDetail", {
                  title: book.title,
                  image: book.imageUrl,
                  author: book.author,
                  stars: book.stars,
                });
              }}
              className="mr-8 w-32 h-66 bg-[#f5f5f5]"
              key={book?.id}
            >
              <Image
                source={{ uri: book?.imageUrl }}
                className="h-48 w-36 rounded-lg"
                resizeMode="cover"
              />

              <Text className="text-gray-600 font-semibold text-base">
                {book?.title}
              </Text>

              <Text className="text-xs text-gray-400 font-medium">
                {book?.author}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Text className="text-2xl mt-6 text-gray-600 font-semibold">
        Lançamentos
      </Text>

      <View className="h-48 bg-[#f5f5f5]"></View>
    </View>
  );
};

export default HomeScreen;
