import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import PickerSelect from 'react-native-picker-select';

import {
  Container,
  Main,
  Title,
  Description,
  Button,
  ButtonIcon,
  ButtonText,
} from './styles';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
    height: 60,
  },
  inputAndroid: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
    height: 60,
  },
});

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface PickerSelectDTO {
  label: string;
  value: string;
}

const Home: React.FC = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  const [ufs, setUfs] = useState<PickerSelectDTO[]>([]);
  const [cities, setCities] = useState<PickerSelectDTO[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response =>
        setUfs(
          response.data.map(IBGEUf => ({
            label: IBGEUf.sigla,
            value: IBGEUf.sigla,
          })),
        ),
      );
  }, []);

  useEffect(() => {
    setCity('');

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      )
      .then(response =>
        setCities(
          response.data.map(IBGECity => ({
            label: IBGECity.nome,
            value: IBGECity.nome,
          })),
        ),
      );
  }, [uf]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
      >
        <Main>
          <Image source={require('../../assets/logo.png')} />
          <Title>Seu marketplace de coleta de residuos</Title>
          <Description>
            Ajudamos pessoas a encontratem pontos de coleta de forma eficiente
          </Description>
        </Main>

        <View>
          <PickerSelect
            placeholder={{
              label: 'Selecione uma UF',
              value: 'none',
              color: '#222',
            }}
            style={pickerSelectStyles}
            value={uf}
            onValueChange={value => setUf(value)}
            items={ufs}
          />
          <PickerSelect
            placeholder={{
              label: 'Selecione uma cidade',
              value: 'none',
              color: '#222',
            }}
            style={pickerSelectStyles}
            value={city}
            onValueChange={value => setCity(value)}
            items={cities}
          />

          <Button onPress={() => navigation.navigate('Points', { uf, city })}>
            <ButtonIcon>
              <Feather name="arrow-right" color="#fff" size={24} />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Home;
