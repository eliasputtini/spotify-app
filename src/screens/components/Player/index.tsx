import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';

import * as Actions from '../../../actions';

import {Container} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';

export const Player = ({id, url, title, artists = [], artwork, style}) => {
  const dispatch = useDispatch();
  const [playerState, setPlayerState] = useState(null);

  const isAndroid = Platform.OS === 'android';
  const artist = artists.map(artist => artist.name).join(', ');
  const track = {id, url, title, artist, artwork};
  const options = {waitForBuffer: true};

  const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,
  ];

  useTrackPlayerEvents(events, event => {
    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      setPlayerState(event.state);
    } else if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.log(event.message);
    }
  });

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer(options);
        await TrackPlayer.add([track]);
      } catch (error) {
        console.log(error);
      }
    };
    setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return (
    <Container>
      {(playerState === TrackPlayer.STATE_READY ||
        playerState === TrackPlayer.STATE_PAUSED ||
        playerState === TrackPlayer.STATE_STOPPED) && (
        <TouchableOpacity onPress={() => TrackPlayer.play()}>
          <Icon name="play" size={60} />
        </TouchableOpacity>
      )}
      {playerState === TrackPlayer.STATE_PLAYING && (
        <TouchableOpacity onPress={() => TrackPlayer.pause()}>
          <Icon name="pause" size={60} />
        </TouchableOpacity>
      )}
      {(playerState === TrackPlayer.STATE_NONE ||
        playerState === TrackPlayer.STATE_BUFFERING ||
        playerState === TrackPlayer.STATE_CONNECTING) && (
        <ActivityIndicator size={isAndroid ? 48 : 'large'} color="white" />
      )}
    </Container>
  );
};
