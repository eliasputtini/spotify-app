import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  background-color: #e6eaee;
  border-rdius: 20px;
  flex-direction: row;
  height: 40px;
  margin: 20px;
};`;

const Input = styled.TextInput`
  color: #111111;
  flex: 1;
  font-family: 'Montserrat-Medium';
  font-size: 16px;
  height: 40px;
  padding-left: 16px;
  padding-vertical: 0px;
`;

export {Container, Input};
