import React, { ReactNode } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import back from '../../assets/images/icons/back.png';
import logo from '../../assets/images/logo.png';

import { Container, Topbar, Title, Header } from './styles';

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <Topbar>
        <TouchableOpacity onPress={() => navigate('Landing')}>
          <Image source={back} resizeMode="contain" />
        </TouchableOpacity>

        <Image source={logo} resizeMode="contain" />
      </Topbar>

      <Header>
        <Title>{title}</Title>

        {headerRight}
      </Header>

      {children}
    </Container>
  );
};

export default PageHeader;
