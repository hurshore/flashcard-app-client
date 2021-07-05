import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ViewFlashcardScreen from '../screens/ViewFlashcardScreen';
import { HomeScreenParamList } from './types';

const Stack = createStackNavigator<HomeScreenParamList>();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ViewFlashcard" component={ViewFlashcardScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
