import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import landing from '../../assets/images/landing.png';
import study from '../../assets/images/icons/study.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import heart from '../../assets/images/icons/heart.png';

import {
  Container,
  Banner,
  Title,
  Bold,
  ButtonsContainer,
  Button,
  ButtonText,
  TotalConnections,
} from './styles';

const Landing: React.FC = () => {
  const [totalConnection, setTotalConnection] = useState(0);

  const { navigate } = useNavigation();

  useEffect(() => {
    api
      .get('connections')
      .then(response => setTotalConnection(response.data.total));
  }, []);

  return (
    <Container>
      <Banner source={landing} style={{ resizeMode: 'contain' }} />
      <Title>
        Seja bem-vindo, {'\n'}
        <Bold>O que deseja fazer?</Bold>
      </Title>

      <ButtonsContainer>
        <Button
          style={{ backgroundColor: '#9871f5' }}
          onPress={() => navigate('AppTabs')}
        >
          <Image source={study} />

          <ButtonText>Estudar</ButtonText>
        </Button>

        <Button
          style={{ backgroundColor: '#04d361' }}
          onPress={() => navigate('GiveClasses')}
        >
          <Image source={giveClasses} />

          <ButtonText>Dar aulas</ButtonText>
        </Button>
      </ButtonsContainer>

      <TotalConnections>
        Total de {totalConnection} conexões realizadas <Image source={heart} />
      </TotalConnections>
    </Container>
  );
};

export default Landing;
