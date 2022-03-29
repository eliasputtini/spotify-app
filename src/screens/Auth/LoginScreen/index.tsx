import React from 'react';
import queryString from 'query-string';
import {NavigationScreenProps} from 'react-navigation';
import {Linking} from 'react-native';
import compareAsc from 'date-fns/compareAsc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokenContext} from '../../../context/TokenContext';

const scopes = [
  'user-library-read',
  'user-read-private',
  'user-follow-read',
  'user-read-email',
];

import {Logo, Button, Text, Heading, Container} from './styles';

export const SpotifyLoginScreen: React.FC<NavigationScreenProps> = props => {
  const [, setToken] = React.useContext(TokenContext);

  const openSpotifyLogin = () => {
    const queryParams = {
      client_id: 'e77b9e3801f64f05a87d39ec7de908f5',
      redirect_uri: `spotifyrn://`,
      response_type: 'token',
      scope: scopes.join(','),
    };

    Linking.openURL(
      `https://accounts.spotify.com/authorize?${queryString.stringify(
        queryParams,
      )}`,
    ).catch(console.error);
  };

  React.useEffect(() => {
    const handleSpotifyCallback = ({url}: {url: string}) => {
      const params = queryString.parse(url);
      const access_token = params[`spotifyrn://#access_token`];

      props.navigation.navigate('Callback', {
        access_token,
        expires_in: params.expires_in,
        token_type: params.token_type,
      });
    };

    Linking.addEventListener('url', handleSpotifyCallback);
    return () => {
      Linking.removeEventListener('url', handleSpotifyCallback);
    };
  }, [props.navigation]);

  React.useEffect(() => {
    AsyncStorage.multiGet(['access-token', 'token-expires'])
      .then(vals => {
        if (vals.length === 2) {
          const [, accessToken] = vals[0];
          const [, expiresIn] = vals[1];
          if (
            accessToken &&
            expiresIn &&
            compareAsc(new Date(expiresIn), new Date())
          ) {
            setToken(accessToken);
            props.navigation.navigate('Home');
          }
        }
      })
      .catch(console.error);
  }, [props.navigation, setToken]);

  return (
    <Container>
      <Logo source={require('../../../assets/spotify-icon-green.png')} />
      <Heading>React Native Spotify</Heading>
      <Button onPress={openSpotifyLogin}>
        <Text>Login com Spotify</Text>
      </Button>
      <Button
        onPress={() => {
          props.navigation.navigate('Home');
        }}>
        <Text>Entrar como Convidado</Text>
      </Button>
    </Container>
  );
};
