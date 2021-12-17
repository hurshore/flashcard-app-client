import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppStackParamList } from './types';
import ViewFlashcardScreen from '../screens/ViewFlashcardScreen';
import UserFlashcardsScreen from '../screens/UserFlashcardsScreen';
import EditFlashcardScreen from '../screens/EditFlashcardScreen';

const Stack = createStackNavigator<AppStackParamList>();

const UserFlashcardsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyFlashcards" component={UserFlashcardsScreen} />
    <Stack.Screen name="ViewFlashcard" component={ViewFlashcardScreen} />
    <Stack.Screen name="EditFlashcard" component={EditFlashcardScreen} />
  </Stack.Navigator>
);

export default UserFlashcardsNavigator;
