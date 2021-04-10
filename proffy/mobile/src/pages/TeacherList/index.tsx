import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import {
  Container,
  TeacherListScroll,
  SearchForm,
  Label,
  Input,
  Select,
  InputGroup,
  InputBlock,
  SubmitButton,
  SubmitButtonText,
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedIds = JSON.parse(response).map(
          (teacher: Teacher) => teacher.id,
        );

        setFavorites(favoritedIds);
      }
    });
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('classes', {
      params: { subject, week_day, time },
    });

    setIsFilterVisible(false);
    setTeachers(response.data);
  }

  return (
    <Container>
      <ScrollView>
        <PageHeader
          title="Proffys disponíveis"
          headerRight={
            <TouchableOpacity
              onPress={() => setIsFilterVisible(!isFilterVisible)}
            >
              <Feather name="filter" size={20} color="#fff" />
            </TouchableOpacity>
          }
        >
          {isFilterVisible && (
            <SearchForm>
              <Label>Matéria</Label>
              <Input
                placeholder="Qual a matéria?"
                placeholderTextColor="#c1bccc"
                value={subject}
                onChangeText={setSubject}
              />

              <InputGroup>
                <InputBlock>
                  <Label>Dia da semana</Label>
                  <Select
                    selectedValue={week_day}
                    onValueChange={itemValue =>
                      setWeekDay(itemValue.toString())
                    }
                  >
                    <Select.Item label="Domingo" value="0" />
                    <Select.Item label="Segunda-feira" value="1" />
                    <Select.Item label="Terça-feira" value="2" />
                    <Select.Item label="Quarta-feira" value="3" />
                    <Select.Item label="Quinta-feira" value="4" />
                    <Select.Item label="Sexta-feira" value="5" />
                    <Select.Item label="Sábado" value="6" />
                  </Select>
                </InputBlock>

                <InputBlock>
                  <Label>Horário</Label>
                  <Select
                    selectedValue={time}
                    onValueChange={itemValue => setTime(itemValue.toString())}
                  >
                    <Select.Item label="6:00" value="6:00" />
                    <Select.Item label="7:00" value="7:00" />
                    <Select.Item label="8:00" value="8:00" />
                    <Select.Item label="9:00" value="9:00" />
                    <Select.Item label="10:00" value="10:00" />
                    <Select.Item label="11:00" value="11:00" />
                    <Select.Item label="12:00" value="12:00" />
                    <Select.Item label="13:00" value="13:00" />
                    <Select.Item label="14:00" value="14:00" />
                    <Select.Item label="15:00" value="15:00" />
                    <Select.Item label="16:00" value="16:00" />
                    <Select.Item label="17:00" value="17:00" />
                    <Select.Item label="18:00" value="18:00" />
                    <Select.Item label="19:00" value="19:00" />
                    <Select.Item label="20:00" value="20:00" />
                    <Select.Item label="21:00" value="21:00" />
                    <Select.Item label="22:00" value="22:00" />
                  </Select>
                </InputBlock>
              </InputGroup>

              <SubmitButton onPress={handleFiltersSubmit}>
                <SubmitButtonText>Filtrar</SubmitButtonText>
              </SubmitButton>
            </SearchForm>
          )}
        </PageHeader>

        <TeacherListScroll
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
        >
          {teachers.map((teacher: Teacher) => (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          ))}
        </TeacherListScroll>
      </ScrollView>
    </Container>
  );
};

export default TeacherList;
