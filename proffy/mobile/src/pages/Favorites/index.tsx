import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import { Container, TeacherListScroll } from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('favorites').then(response => {
        if (response) setFavorites(JSON.parse(response));
      });
    }, []),
  );

  return (
    <Container>
      <PageHeader title="Meus Proffys favoritos" />

      <TeacherListScroll
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        {favorites.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited />
        ))}
      </TeacherListScroll>
    </Container>
  );
};

export default Favorites;
