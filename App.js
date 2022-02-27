/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import HomeScreen from './src/pages/HomePage/HomeScreen';
import CameraScreen from './src/pages/CameraPage/CameraScreen';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


const App = () => {


let [fontsLoaded] = useFonts({
  'Montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
  'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
  'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
})

if (!fontsLoaded) {
  return <AppLoading />;
}


  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={HomeScreen}
          />
          <Stack.Screen
              name="Camera"
              component={CameraScreen}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
};





export default App;
