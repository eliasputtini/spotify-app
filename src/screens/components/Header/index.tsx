import React from 'react';

import {Image, Container, Button, Text} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Header = ({navigation, previous}) => {
  return (
    <Container>
      {previous && (
        <Button onPress={navigation.goBack}>
          <Icon name="arrow-left" color="#ababab" size={18} />
          <Text>
            React Native Spotify{'  '}
            <Image source={require('../../../assets/spotify-icon-green.png')} />
          </Text>
        </Button>
      )}
    </Container>
  );
};
