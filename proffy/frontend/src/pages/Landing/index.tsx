import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';
import study from '../../assets/images/icons/study.svg';
import giveClasses from '../../assets/images/icons/give-classes.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import {
  Container,
  Content,
  Logo,
  Hero,
  ButtonsContainer,
  TotalConnections,
} from './styles';

const Landing: React.FC = () => {
  const [totalConnection, setTotalConnection] = useState(0);

  useEffect(() => {
    api
      .get('connections')
      .then(response => setTotalConnection(response.data.total));
  }, []);

  return (
    <Container>
      <Content>
        <Logo>
          <img src={logo} alt="Proffy" />

          <h2>Sua plataforma de estudos online.</h2>
        </Logo>

        <Hero src={landing} alt="Plataforma de estudos" />

        <ButtonsContainer>
          <Link to="study" className="study">
            <img src={study} alt="Estudar" />
            Estudar
          </Link>

          <Link to="give-classes" className="give-classes">
            <img src={giveClasses} alt="Dar aulas" />
            Estudar
          </Link>
        </ButtonsContainer>

        <TotalConnections>
          Total de {totalConnection} conexões já realizadas
          <img src={purpleHeart} alt="Coração roxo" />
        </TotalConnections>
      </Content>
    </Container>
  );
};

export default Landing;
