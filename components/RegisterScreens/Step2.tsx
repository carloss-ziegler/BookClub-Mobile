// @ts-nocheck
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState } from "react";

const Step2 = () => {
  const [isSelected, setIsSelected] = useState();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 30,
        paddingBottom: 150,
      }}
      style={{
        marginBottom: 200,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity className="bg-red-500 p-4 mx-4 rounded-lg">
        <Text className="text-[#f5f5f5] text-center text-lg font-semibold">
          Assinatura Mensal
        </Text>

        <Text className="text-center text-[#f5f5f5] font-bold mt-5 text-lg">
          R$ <Text className="text-2xl">19,90</Text>
        </Text>

        <TouchableOpacity className="bg-[#f5f5f5] py-2 items-center justify-center mt-10 rounded">
          <Text className="text-red-500 font-semibold text-lg">
            Assine Agora
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity className="bg-red-500 mt-5 p-4 mx-4 rounded-lg">
        <Text className="text-[#f5f5f5] text-center text-lg font-semibold">
          Assinatura Trimestral
        </Text>

        <Text className="text-center text-[#f5f5f5] font-bold mt-5 text-lg">
          R$ <Text className="text-2xl">53,90</Text>
        </Text>

        <TouchableOpacity className="bg-[#f5f5f5] py-2 items-center justify-center mt-10 rounded">
          <Text className="text-red-500 font-semibold text-lg">
            Assine Agora
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity className="bg-red-500 mt-5 p-4 mx-4 rounded-lg">
        <Text className="text-[#f5f5f5] text-center text-lg font-semibold">
          Assinatura Anual
        </Text>

        <Text className="text-center text-[#f5f5f5] font-bold mt-5 text-lg">
          R$ <Text className="text-2xl">167,90</Text>
        </Text>

        <TouchableOpacity className="bg-[#f5f5f5] py-2 items-center justify-center mt-10 rounded">
          <Text className="text-red-500 font-semibold text-lg">
            Assine Agora
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step2;
