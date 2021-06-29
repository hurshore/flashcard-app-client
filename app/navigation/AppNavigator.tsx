import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CreateFlashcardScreen from '../screens/CreateFlashcardScreen';
import UserFlashcardsScreen from '../screens/UserFlashcardsScreen';
import AccountScreen from '../screens/AccountScreen';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: colors.primary }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Flashcard"
        component={CreateFlashcardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Flashcards"
        component={UserFlashcardsScreen}
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
