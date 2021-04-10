import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warning from '../../assets/images/icons/warning.svg';

import { Container, Content, Footer, ScheduleItem } from './styles';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const history = useHistory();

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updatedScheduleItem = scheduleItems.map((item, index) => {
      if (index === position) return { ...item, [field]: value };

      return item;
    });

    setScheduleItems(updatedScheduleItem);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => alert('Cadastro realizado com sucesso!'))
      .catch(() => alert('Erro no cadastro!'));

    history.push('/');
  }

  return (
    <Container>
      <PageHeader
        title="Que incrivel que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <Content>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              label="Nome completo"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
            />
            <Input
              label="Whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />
            <Textarea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

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
            <Input
              label="Custo da sua hora por aula"
              name="cost"
              value={cost}
              onChange={e => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((item, index) => (
              <ScheduleItem key={item.week_day}>
                <Select
                  label="Dia da semana"
                  name="week_day"
                  value={item.week_day}
                  onChange={e =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
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
                  label="Das"
                  type="time"
                  name="from"
                  value={item.from}
                  onChange={e =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  label="Até"
                  type="time"
                  name="to"
                  value={item.to}
                  onChange={e =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </ScheduleItem>
            ))}
          </fieldset>

          <Footer>
            <p>
              <img src={warning} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </Footer>
        </form>
      </Content>
    </Container>
  );
};

export default TeacherForm;
