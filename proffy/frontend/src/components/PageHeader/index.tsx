import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import { Container, Content, TopBar } from './styles';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Container>
      <TopBar>
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>

        <img src={logo} alt="Proffy" />
      </TopBar>

      <Content>
        <strong>{title}</strong>

        {description && <p>{description}</p>}

        {children}
      </Content>
    </Container>
  );
};

export default PageHeader;
