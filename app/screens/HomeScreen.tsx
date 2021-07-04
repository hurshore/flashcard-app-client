import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import Screen from '../components/Screen';
import FlashcardSet from '../components/FlashcardSet';
import Text from '../components/Text';
import colors from '../config/colors';
import flashcardApi from '../api/flashcard';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';
import { string } from 'yup';

const FLASHCARDS = [
  {
    id: 1,
    subject: 'Science',
    flashcardCount: 7,
  },
  {
    id: 2,
    subject: 'Technology',
    flashcardCount: 7,
  },
  {
    id: 3,
    subject: 'Arts',
    flashcardCount: 7,
  },
  {
    id: 4,
    subject: 'Business',
    flashcardCount: 7,
  },
];

interface FlashcardSet {
  id: number | string;
  name: string;
}

const HomeScreen = ({}) => {
  const exploreApi = useApi(flashcardApi.getRandomFlashcards);

  useEffect(() => {
    exploreApi.request();
  }, []);

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={exploreApi.loading} />
      <Text style={styles.header}>Explore</Text>
      <FlatList
        data={exploreApi.data}
        keyExtractor={(item: FlashcardSet) => item.id.toString()}
        renderItem={({ item }) => (
          <FlashcardSet
            onPress={() => console.log('Flashcard set clicked')}
            subject={item.name}
            flashcardCount={20}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 10,
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
