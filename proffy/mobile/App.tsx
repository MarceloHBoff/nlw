import 'react-native-gesture-handler';

import React from 'react';
import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { AppLoading } from 'expo';

import AppStack from './src/routes/AppStack';
import { StatusBar } from 'react-native';

const App = () => {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <AppStack />
      <StatusBar barStyle="light-content" backgroundColor="#8257e5" />
    </>
  );
};

export default App;
