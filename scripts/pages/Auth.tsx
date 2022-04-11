/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Platform,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {SCREEN_NAME} from '../constants';

interface Props {
  setAuthenticated: (value: boolean) => void;
  navigation: any;
}

const Comp = (props: Props) => {
  const authenticate = async () => {
    try {
      const results = await LocalAuthentication.authenticateAsync();

      if (results.success) {
        props.setAuthenticated(true);
        props.navigation.dispatch(StackActions.replace(SCREEN_NAME.Todo));
      } else if (results.error === 'not_enrolled') {
        if (Platform.OS === 'android') {
          const {AuthModule} = NativeModules;
          AuthModule.enroll().then((result: any) => console.log(result));
        }
      } else if (results.error === 'unknown') {
      } else if (
        results.error === 'user_cancel' ||
        results.error === 'system_cancel' ||
        results.error === 'app_cancel'
      ) {
      } else {
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.masterContainer}>
      <View style={styles.container}>
        <Text style={{marginBottom: 12}}>Need authentication to proceed</Text>
        <Button onPress={authenticate} title={'Authenticate'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  masterContainer: {
    flex: 1,
  },
});

export default Comp;
