import React from 'react';

import whatsapp from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import { Container, Header, Footer } from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', { user_id: teacher.id });
  }

  return (
    <Container>
      <Header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <strong>{teacher.subject}</strong>
        </div>
      </Header>

      <p>{teacher.bio}</p>

      <Footer>
        <p>
          Preço/hora
          <strong>{teacher.cost}</strong>
        </p>

        <a
          onClick={createNewConnection}
          target="_blank"
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsapp} alt="whatsapp" />
          Entrar em contato
        </a>
      </Footer>
    </Container>
  );
};

export default TeacherItem;
