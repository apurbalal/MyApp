/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './Auth';
import Todo from './Todo';
import store from '../redux/store';
import {SCENE_NAME} from '../constants';

const Stack = createNativeStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCENE_NAME.Auth}
        screenOptions={{headerBackVisible: false}}>
        <Stack.Screen name={SCENE_NAME.Auth} component={Auth} />
        <Stack.Screen name={SCENE_NAME.Todo} component={Todo} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
