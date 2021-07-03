import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthContext from './app/auth/context';
import FlipCardContext from './app/context/flipcard';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import CreateFlashcardScreen from './app/screens/CreateFlashcardScreen';
import UserFlashcardsScreen from './app/screens/UserFlashcardsScreen';
import ViewFlashcardScreen from './app/screens/ViewFlashcardScreen';
import AccountScreen from './app/screens/AccountScreen';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';

const FLASHCARDS = [
  {
    answer: 'World Wide Web',
    question: 'What is the full meaning of WWW?',
    flashcardSetId: '60d0475a988042139a947815',
  },
  {
    answer: 'HyperText Markup Language',
    question: 'What is the full meaning of HTML?',
    flashcardSetId: '60d0475a988042139a947815',
  },
  {
    answer: 'Cascading Style Sheet',
    question: 'What is the full meaning of CSS?',
    flashcardSetId: '60d0475a988042139a947815',
  },
  {
    answer: 'JavaScript',
    question: 'What is the full meaning of JS?',
    flashcardSetId: '60d0475a988042139a947815',
  },
];

type IUSer = {
  name: string;
  email: string;
  flashcardSets: [];
};

export default function App() {
  const [user, setUser] = useState<IUSer | null>(null);
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ user, setUser }}>
        <FlipCardContext.Provider value={{ flipped, flipCard }}>
          {user ? <AppNavigator /> : <AuthNavigator />}
          {/* <ViewFlashcardScreen subject="Technology" flashcards={FLASHCARDS} /> */}
        </FlipCardContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
