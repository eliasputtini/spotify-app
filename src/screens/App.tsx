import 'react-native-gesture-handler';

import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from './Home';
import {Details} from './Details';
import {SpotifyCallbackScreen} from './Auth/CallbackScreen';
import {SpotifyLoginScreen} from './Auth/LoginScreen';
import {Header} from './components/Header';

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from '../reducers';
import {rootSaga} from '../sagas';

import {TokenProvider} from '../context/TokenContext';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Stack = createStackNavigator();

const navigatorOptions = {
  headerMode: 'screen',
  screenOptions: {
    title: 'React Native Spotify',
    header: options => <Header {...options} />,
    cardStyle: {backgroundColor: '#232323'}, // Default screen style
  },
};

export const App: React.FC<any> = () => (
  <>
    <StatusBar backgroundColor={'#232323'} barStyle="light-content" />
    <Provider store={store}>
      <TokenProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" {...navigatorOptions}>
            <Stack.Screen name="Login" component={SpotifyLoginScreen} />
            <Stack.Screen name="Callback" component={SpotifyCallbackScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        </NavigationContainer>
      </TokenProvider>
    </Provider>
  </>
);
