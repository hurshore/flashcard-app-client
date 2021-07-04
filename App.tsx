import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import AuthContext from './app/auth/context';
import FlipCardContext from './app/context/flipcard';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import authStorage from './app/auth/storage';

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

type USer = {
  name: string;
  email: string;
};

export default function App() {
  const [user, setUser] = useState<USer | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

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
