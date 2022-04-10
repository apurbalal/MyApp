/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
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
import {SCENE_NAME} from '../constants';

const Comp = (props: any) => {
  const checkDeviceForHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      console.log('Apurbalal compatible');
    } else {
      console.log('Apurbalal not compatible');
    }
  };

  const checkForBiometrics = async () => {
    const biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (biometricRecords) {
      console.log('Apurbalal biometric compatible');
    } else {
      console.log('Apurbalal biometric not compatible');
    }
  };

  useEffect(() => {
    checkDeviceForHardware();
    checkForBiometrics();
  }, []);

  const authenticate = async () => {
    try {
      const results = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Fall back label',
        disableDeviceFallback: false,
      });
      if (results.success) {
        props?.authenticated(true);
        props?.navigation.dispatch(StackActions.replace(SCENE_NAME.Todo));
      } else if (results.error === 'not_enrolled') {
        if (Platform.OS === 'android') {
          const {AuthModule} = NativeModules;
          AuthModule.createCredential().then((result: any) =>
            console.log(result),
          );
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
        <Text style={{marginBottom: 12}}>Set Authentication to proceed</Text>
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
