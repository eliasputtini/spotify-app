import styled from 'styled-components/native';

const Logo = styled.Image`
  height: 44px;
  width: 44px;
  margin-bottom: 10px;
};`;

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
};`;

const Button = styled.TouchableOpacity`
  background-color: #1db954;
  border-radius: 500px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  margin: 10px;
`;

const Text = styled.Text`
  font-weight: bold;
  text-transform: uppercase;
`;

const Heading = styled.Text`
  margin-bottom: 20px;
  color: white;
`;

export {Heading, Container, Button, Logo, Text};
