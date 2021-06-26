import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import FlipCardContext from './app/context/flipcard';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import CreateFlashcardScreen from './app/screens/CreateFlashcardScreen';
import UserFlashcardsScreen from './app/screens/UserFlashcardsScreen';
import ViewFlashcardScreen from './app/screens/ViewFlashcardScreen';
import AccountScreen from './app/screens/AccountScreen';

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

export default function App() {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <FlipCardContext.Provider value={{ flipped, flipCard }}>
      <ViewFlashcardScreen subject="Technology" flashcards={FLASHCARDS} />
    </FlipCardContext.Provider>
  );
}
