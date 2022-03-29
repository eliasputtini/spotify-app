import {AppRegistry} from 'react-native';
import {App} from './src/screens/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import trackPlayerService from './src/services/trackPlayerService';

AppRegistry.registerComponent(appName, () => App);
// TrackPlayer service has to be registered right after the main App component
TrackPlayer.registerPlaybackService(() => trackPlayerService);
