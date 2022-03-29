import styled from 'styled-components/native';

const Image = styled.Image`
  height: 18px;
  width: 18px; ;
`;

const Container = styled.SafeAreaView`
  align-items: center;
  background-color: #232323;
  flex-direction: row;
  margin-horizontal: 20px;
  margin-top: 20px; ;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  flex: 1;
  color: #ababab;
  font-size: 16px;
  font-family: 'Montserrat-Medium';
  text-align: center;
`;

export {Image, Container, Button, Text};
