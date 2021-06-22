import { StatusBar } from 'expo-status-bar';
import React from 'react';

import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import CreateFlashcardScreen from './app/screens/CreateFlashcardScreen';
import UserFlashcardsScreen from './app/screens/UserFlashcardsScreen';

export default function App() {
  return <CreateFlashcardScreen />;
}
