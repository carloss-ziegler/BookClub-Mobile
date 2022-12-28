// @ts-nocheck
import { Text, TouchableOpacity, ScrollView } from "react-native";
import React, { Ref, useRef } from "react";

interface Step2Props {
  isSelected: undefined | Ref;
  setIsSelected: () => void;
}

const Step2 = ({ isSelected, setIsSelected }: Step2Props) => {
  const monthlyRef = useRef();
  const trimestralRef = useRef();
  const yearRef = useRef();

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
      <Text className="font-semibold text-lg mb-3">Selecione um plano</Text>

      <TouchableOpacity
        ref={monthlyRef}
        className={`${
          isSelected == monthlyRef ? "opacity-100" : "opacity-40"
        } p-4 mx-4 rounded-lg bg-red-500`}
        onPress={() => {
          setIsSelected(monthlyRef);
        }}
      >
        <Text className="text-[#f5f5f5] text-center text-lg font-semibold">
          Assinatura Mensal
        </Text>

        <Text className="text-center text-[#f5f5f5] font-bold mt-5 text-lg">
          R$ <Text className="text-2xl">19,90</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            setIsSelected(monthlyRef);
          }}
          className="bg-[#f5f5f5] py-2 items-center justify-center mt-10 rounded"
        >
          <Text className="text-red-500 font-semibold text-lg">
            Assine Agora
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        ref={trimestralRef}
        className={`${
          isSelected == trimestralRef ? "opacity-100" : "opacity-40"
        } p-4 mx-4 rounded-lg mt-5 bg-red-500`}
        onPress={() => {
          setIsSelected(trimestralRef);
        }}
      >
        <Text className="text-[#f5f5f5] text-center text-lg font-semibold">
          Assinatura Trimestral
        </Text>

        <Text className="text-center text-[#f5f5f5] font-bold mt-5 text-lg">
          R$ <Text className="text-2xl">53,90</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            setIsSelected(trimestralRef);
          }}
          className="bg-[#f5f5f5] py-2 items-center justify-center mt-10 rounded"
        >
          <Text className="text-red-500 font-semibold text-lg">
            Assine Agora
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        ref={yearRef}
        className={`${
          isSelected == yearRef ? "opacity-100" : "opacity-40"
        } p-4 mx-4 rounded-lg mt-5 bg-red-500`}
        onPress={() => {
          setIsSelected(yearRef);
        }}
      >
        <Text className="text-[#f5f5f5] text-center text-lg font-semibold">
          Assinatura Anual
        </Text>

        <Text className="text-center text-[#f5f5f5] font-bold mt-5 text-lg">
          R$ <Text className="text-2xl">167,90</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            setIsSelected(yearRef);
          }}
          className="bg-[#f5f5f5] py-2 items-center justify-center mt-10 rounded"
        >
          <Text className="text-red-500 font-semibold text-lg">
            Assine Agora
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step2;
