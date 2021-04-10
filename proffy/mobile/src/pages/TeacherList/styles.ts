import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #f0f0f0;
`;

export const TeacherListScroll = styled.ScrollView`
  margin-top: -40px;
`;

export const SearchForm = styled.View`
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #d4c2ff;
`;

export const Input = styled.TextInput`
  font-family: 'Poppins_400Regular';
  height: 54px;
  background: #fff;
  justify-content: center;
  padding: 0 16px;
  margin-top: 4px;
  margin-bottom: 16px;
`;

export const Select = styled(Picker)`
  font-family: 'Poppins_400Regular';
  height: 54px;
  background: #fff;
  padding: 0 16px;
  margin-top: 4px;
  margin-bottom: 16px;
`;

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputBlock = styled.View`
  width: 48%;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #04d361;
  height: 56px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 16px;
  color: #fff;
`;
