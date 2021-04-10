import React, { FormEvent, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import { Container, Content, Form } from './styles';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: { subject, week_day, time },
    });

    setTeachers(response.data);
  }

  return (
    <Container>
      <PageHeader title="Esses são os proffys disponiveis">
        <Form onSubmit={searchTeachers}>
          <Select
            label="Matéria"
            name="subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'Artes', text: 'Artes' },
              { value: 'Biologia', text: 'Biologia' },
              { value: 'Ciências', text: 'Ciências' },
              { value: 'Educação física', text: 'Educação física' },
              { value: 'Geografia', text: 'Geografia' },
              { value: 'História', text: 'História' },
              { value: 'Matemática', text: 'Matemática' },
              { value: 'Português', text: 'Português' },
              { value: 'Química', text: 'Química' },
            ]}
          />

          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value: '0', text: 'Domingo' },
              { value: '1', text: 'Segunda-feira' },
              { value: '2', text: 'Terça-feira' },
              { value: '3', text: 'Quarta-feira' },
              { value: '4', text: 'Quinta-feira' },
              { value: '5', text: 'Sexta-feira' },
              { value: '6', text: 'Sábado' },
            ]}
          />

          <Input
            type="time"
            label="Hora"
            name="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button type="submit">Buscar</button>
        </Form>
      </PageHeader>

      <Content>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </Content>
    </Container>
  );
};

export default TeacherList;
