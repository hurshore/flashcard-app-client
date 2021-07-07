import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CreateFlashcardScreen from '../screens/CreateFlashcardScreen';
import AccountScreen from '../screens/AccountScreen';
import colors from '../config/colors';
import HomeNavigator from './HomeNavigator';
import { AppStackParamList } from './types';
import UserFlashcardsNavigator from './UserFlashcardsNavigator';

const Tab = createBottomTabNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: colors.primary }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddFlashcard"
        component={CreateFlashcardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyFlashcards"
        component={UserFlashcardsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
