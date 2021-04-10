import React, { useEffect, useState } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Adress,
  AdressTitle,
  AdressContent,
  Footer,
  Button,
  ButtonText,
} from './styles';

interface Params {
  id: number;
}

interface Data {
  point: {
    id: number;
    name: string;
    image_url: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const routeParams = route.params as Params;

  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {
    api
      .get(`points/${routeParams.id}`)
      .then(response => setData(response.data));
  }, [routeParams.id]);

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interessa na coleta de resíduos',
      recipients: [data.point.email],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatspp://send?phone${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`,
    );
  }

  if (!data.point) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <PointImage source={{ uri: data.point.image_url }} resizeMode="cover" />

        <PointName>{data.point.name}</PointName>
        <PointItems>{data.items.map(item => item.title).join(', ')}</PointItems>

        <Adress>
          <AdressTitle>Endereço</AdressTitle>
          <AdressContent>
            {data.point.city}, {data.point.uf}
          </AdressContent>
        </Adress>
      </Container>

      <Footer>
        <Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>
        <Button onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#fff" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  );
};

export default Detail;
