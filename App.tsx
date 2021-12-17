import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import AuthContext from './app/auth/context';
import FlipCardContext from './app/context/flipcard';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import authStorage from './app/auth/storage';
import { FlashcardProvider } from './app/context/flashcard';

type User = {
  name: string;
  email: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
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
          <FlashcardProvider>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </FlashcardProvider>
          <StatusBar style="auto" />
        </FlipCardContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
