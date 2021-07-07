import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ViewFlashcardScreen from '../screens/ViewFlashcardScreen';
import { AppStackParamList } from './types';
import UserFlashcardsScreen from '../screens/UserFlashcardsScreen';

const Stack = createStackNavigator<AppStackParamList>();

const UserFlashcardsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyFlashcards" component={UserFlashcardsScreen} />
    <Stack.Screen name="ViewFlashcard" component={ViewFlashcardScreen} />
  </Stack.Navigator>
);

export default UserFlashcardsNavigator;
