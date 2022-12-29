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
import Empty from "../../assets/images/emptyState.png";
import { collection, getDocs, query, where } from "firebase/firestore";

interface CardProps {
  id: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CardScreen = ({ navigation }) => {
  const name = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const res = async () => {
      let list = [];

      setLoading(true);
      try {
        const q = query(collection(db, "user"), where("email", "==", email));

        const querySnapshot = await getDocs(q);
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
          Pagamento
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
          contentContainerStyle={{
            flex: 1,
          }}
        >
          {cardData.length < 1 ? (
            <View className="flex-1 items-center justify-center">
              <Image source={Empty} className="h-72 w-72" />

              <Text className="text-center font-semibold mt-3 text-lg">
                Sem Cartões Ainda!
              </Text>

              <Text className="text-center font-medium text-gray-400">
                Adicione um novo cartão e ele estará disponível aqui.
              </Text>
            </View>
          ) : (
            <>
              {cardData?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CardDetails", {
                      id: item?.id,
                      cardNumber: item?.cardNumber,
                      cardName: item?.cardName,
                      expiryDate: item?.expiryDate,
                      cvv: item?.cvv,
                    });
                  }}
                  key={item?.id}
                >
                  <ImageBackground
                    source={Card}
                    className={`w-full h-44 ${index > 0 && "mt-3"}`}
                    imageStyle={{
                      borderRadius: 8,
                    }}
                  >
                    <View className="absolute top-4 left-4">
                      <Text className="text-[#f5f5f5] font-semibold">
                        **{item?.cards?.cvv.charAt(item?.cards?.cvv.length - 1)}
                      </Text>
                    </View>

                    <Image
                      source={{
                        uri: "https://logosmarcas.net/wp-content/uploads/2020/09/Mastercard-Logo.png",
                      }}
                      className="h-12 w-12 absolute right-3"
                      resizeMode="contain"
                    />

                    <View className="absolute bottom-10 left-5">
                      <Text className="text-lg text-[#f5f5f5] font-semibold">
                        {item?.cards?.cardNumber}
                      </Text>
                    </View>

                    <View className="absolute bottom-5 right-5">
                      <Text className="text-[#f5f5f5] font-semibold">
                        {item?.cards?.expiryDate}
                      </Text>
                    </View>

                    <View className="absolute bottom-5 left-5">
                      <Text className="text-[#f5f5f5] font-semibold">
                        {item?.cards?.cardName}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default CardScreen;
