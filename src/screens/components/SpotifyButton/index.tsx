import React, {useCallback} from 'react';
import {Linking} from 'react-native';

import {Container, Button, Image, Text} from './styles';

export const SpotifyButton = ({uri, url, style}) => {
  const openOnSpotify = useCallback(async () => {
    try {
      const uriSchemeSupported = await Linking.canOpenURL(uri);
      if (uriSchemeSupported) {
        await Linking.openURL(uri);
      } else if (url) {
        await Linking.openURL(url);
      } else {
        throw Error("Can't open link");
      }
    } catch (error) {
      console.log(error);
    }
  }, [uri, url]);

  return (
    <Container>
      <Button onPress={openOnSpotify}>
        <Text>{'Abrir no Spotify'}</Text>
        <Image source={require('../../../assets/spotify-icon-green.png')} />
      </Button>
    </Container>
  );
};
