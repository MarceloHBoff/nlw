import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #8257e5;
  justify-content: center;
  padding: 40px;
`;

export const Content = styled.ImageBackground`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #fff;
  font-size: 32px;
  line-height: 37px;
  max-width: 180px;
`;

export const Description = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #d4c2ff;
  font-size: 16px;
  line-height: 26px;
  max-width: 240px;
  margin-top: 24px;
`;

export const OkButton = styled.TouchableOpacity`
  margin: 40px 0;
  background: #04d361;
  height: 58px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const OkButtonText = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #fff;
  font-size: 16px;
`;
