//@ts-nocheck
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { auth, db } from "../../services/firebase";
import Card from "../../assets/images/card.png";
import { collection, getDocs } from "firebase/firestore";

const CardScreen = ({ navigation }) => {
  const name = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const res = async () => {
      let list = [];

      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "cards"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCardData(list);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };
    res();
  }, []);

  return (
    <View className="flex-1 bg-[#f5f5f5] px-4 py-6 mt-4">
      <View className="items-center flex-row justify-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 flex-row items-center -ml-1"
        >
          <Entypo name="chevron-left" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Perfil</Text>
        </TouchableOpacity>

        <Text className="text-gray-500 font-bold flex-1 text-center text-xl">
          Métodos de Pagamento
        </Text>

        <View className="flex-1" />
      </View>

      <View className="flex-row items-center space-x-2 mt-5 mb-10">
        <Image
          source={{
            uri: "https://backoffice.freedomhint.com/uploads/images/profile_picture/mail_pro.png",
          }}
          className="w-14 h-14 rounded-lg"
          resizeMode="cover"
        />
        <View>
          <Text className="text-[#F26E1D] font-semibold text-xl">{name}</Text>
          <Text className="text-gray-500">{email}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <Text className="font-semibold text-gray-600 text-xl">
          Cartões Cadastrados
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("NewCard")}
          className="bg-[#F26E1D] px-2 h-6 items-center justify-center rounded-lg"
        >
          <Text className="text-[#f5f5f5] font-semibold">+ Cadastrar Novo</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="252525" size="large" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
        >
          {cardData?.map((item, index) => (
            <ImageBackground
              key={item?.id}
              source={Card}
              className={`w-full h-44 ${index > 0 && "mt-3"}`}
              imageStyle={{
                borderRadius: 8,
              }}
            >
              <Image
                source={{
                  uri: "https://logosmarcas.net/wp-content/uploads/2020/09/Mastercard-Logo.png",
                }}
                className="h-12 w-12 absolute right-3"
                resizeMode="contain"
              />

              <View className="absolute bottom-10 left-5">
                <Text className="text-lg text-[#f5f5f5] font-semibold">
                  {item?.cardNumber}
                </Text>
              </View>

              <View className="absolute bottom-5 right-5">
                <Text className="text-[#f5f5f5] font-semibold">
                  {item?.expiryDate}
                </Text>
              </View>

              <View className="absolute bottom-5 left-5">
                <Text className="text-[#f5f5f5] font-semibold">
                  {item?.cardName}
                </Text>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CardScreen;
