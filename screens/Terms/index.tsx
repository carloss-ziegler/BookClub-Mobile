// @ts-nocheck
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Logo from "../../assets/images/logoOrange.png";
import { Entypo } from "@expo/vector-icons";

const Terms = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#e5e5e5] p-5">
      <View className="items-center flex-row justify-between my-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-1 flex-row items-center -ml-1"
        >
          <Entypo name="chevron-left" size={32} color="#F26E1D" />
          <Text className="text-[#F26E1D] text-lg">Perfil</Text>
        </TouchableOpacity>

        <Text className="text-gray-500 font-bold flex-1 text-center text-xl">
          Termos e Condições
        </Text>

        <View className="flex-1" />
      </View>

      <ScrollView>
        <Image
          source={Logo}
          className="self-center w-52 h-52 -mr-3"
          resizeMode="cover"
        />

        <Text className="text-center font-semibold text-lg">
          1 – Sobre a Origem dos seus dados Pessoais Nosso site pode coletar
          alguns dados pessoais seus para diferentes objetivos. Para coletarmos
          estes dados, usamos as seguintes tecnologias: Website: Dentro do nosso
          site você poderá preencher formulários, enviar comentários e dúvidas,
          entrar em contato com nossa equipe ou se cadastrar na nossa
          plataforma, e seus dados serão salvos para posterior atendimento.
          Mensagens e comunicações: Quando você se comunica com nossa equipe,
          seja pelo Whatsapp, por SMS, por E-mail ou quaisquer outros tipos de
          chat, alguns dados podem ficar salvos para futura conferência e
          facilitar a comunicação com nossos clientes e usuários. De Modo
          Offline: Alguns dados podem ser coletados offline, como, por exemplo,
          em eventos e organizações, onde podemos coletar seu e-mail ou outros
          dados, para manter comunicação e informações necessárias que você
          precisa ter conhecimento. Dados de Terceiros: Algumas vezes, terceiros
          podem enviar para nossa empresa alguns dados seus, como, por exemplo,
          dados recebidos por mídias sociais (Como Facebook, instagram, Tiktok
          ou outras redes sociais), do governo ou intermediadoras de pagamentos.
          2 – Como e porque coletamos seus dados: É importante que você, nosso
          usuário ou visitante, saiba como e quais dados pessoais coletamos e
          utilizamos quando você visita nosso site. Destacamos que sempre
          tentamos coletar o mínimo de dados possíveis para sua maior segurança,
          porém, alguns dados são essenciais para podermos entregar o melhor
          serviço possível e até para o funcionamento do site, conforme
          descrevemos abaixo: Marketing: Quando você preenche formulários e se
          cadastra no site, você poderá receber e-mails com promoções e
          novidades do site. Podemos coletar nome, e-mail e telefone. Navegação
          ao Site: quando você navega pelo nosso site, coletamos automaticamente
          dados como o seu endereço IP, tipo de navegador, páginas acessadas,
          tempo gasto em cada página e outras informações. Informações de
          contato: quando você entra em contato conosco, seja por e-mail,
          telefone ou chat, coletamos as suas informações de contato, como o seu
          nome, e-mail, número de telefone e a mensagem que você nos enviou.
          Informações de uso dos serviços: quando você usa os nossos serviços,
          coletamos dados sobre as suas atividades, como as pesquisas que você
          realiza, os vídeos que você assiste, as páginas que você visita e as
          compras que você faz e quando você compartilha conosco fotos,
          comentários, sugestões, perguntas, respostas, informações, textos,
          arquivos, gráficos, vídeos ou outros materiais, coletamos as
          informações que você nos enviar. Informações de localização: quando
          você usa os nossos serviços, coletamos dados de localização precisos
          para fornecer os serviços que você solicitou. Por exemplo, quando você
          solicita um serviço de entrega, coletamos seu endereço para enviar a
          entrega para o local certo.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Terms;
