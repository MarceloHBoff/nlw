import React from 'react';

import { FiCheckCircle } from 'react-icons/fi';
import { Container } from './styles';

const Success: React.FC = () => {
  return (
    <Container>
      <FiCheckCircle size={60} color="#34cb79" />
      <div>Cadastro concluído!</div>
      <span />
    </Container>
  );
};

export default Success;
