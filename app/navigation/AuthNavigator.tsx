import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
