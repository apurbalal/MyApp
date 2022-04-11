/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Platform,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {ScreenName} from '../constants';

interface Props {
  setAuthenticated: (value: boolean) => void;
  navigation: any;
}

const Comp = (props: Props) => {
  const authenticate = async () => {
    try {
      // Attempts to authenticate via Fingerprint/TouchID (or FaceID if available on the device).
      const results = await LocalAuthentication.authenticateAsync();

      if (results.success) {
        // If user is authenticated save the state and go to Todo screen
        props.setAuthenticated(true);
        props.navigation.dispatch(StackActions.replace(ScreenName.TODO));
      } else if (results.error === 'not_enrolled') {
        // if user not_enrolled Android use AuthModule enroll
        // You can check AuthModule.java to check AuthModule implementation
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
        <TouchableOpacity onPress={authenticate} style={styles.button}>
          <Text style={{color: 'white'}}>Authenticate</Text>
        </TouchableOpacity>
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
  button: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
    backgroundColor: 'blue',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Comp;
