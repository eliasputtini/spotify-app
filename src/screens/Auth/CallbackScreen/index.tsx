import React from 'react';
import {NavigationScreenProps} from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {TokenContext} from '../../../context/TokenContext';
import addSeconds from 'date-fns/addSeconds';

import {Container} from './styles';

export const SpotifyCallbackScreen: React.FC<NavigationScreenProps> = ({
  route,
  navigation,
}) => {
  const [, setToken] = React.useContext(TokenContext);

  React.useEffect(() => {
    const accessToken = route.params.access_token;
    const expiresIn = route.params.expires_in;

    setToken(accessToken);

    const now = new Date();
    const tokenExpires = addSeconds(now, expiresIn);

    AsyncStorage.multiSet([
      ['access-token', accessToken],
      ['token-expires', tokenExpires.toISOString()],
      ['token-created', now.toISOString()],
    ]).then(() => navigation.navigate('Home'));
  }, [navigation, setToken]);

  return (
    <Container>
      <ActivityIndicator color={'#1DB954'} size="large" />
    </Container>
  );
};
