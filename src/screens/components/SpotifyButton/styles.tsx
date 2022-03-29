import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: #1db954;
  border-radius: 20px;
  flex-direction: row;
  flex-grow: 0;
  height: 40px;
  justify-content: center;
  padding-horizontal: 16px;
`;
const Image = styled.Image`
  background-color: black;
  border-radius: 50px;
  height: 24px;
  width: 24px;
  margin-left: 15px;
};`;

const Text = styled.Text`
  color: white;
  font-size: 16px;
  font-family: 'Montserrat-Medium';
};`;

export {Container, Button, Image, Text};
