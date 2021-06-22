import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Screen from '../components/Screen';
import FlashcardSet from '../components/FlashcardSet';
import Text from '../components/Text';
import colors from '../config/colors';

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

const HomeScreen = ({}) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>Explore</Text>
      <FlatList
        data={FLASHCARDS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FlashcardSet
            onPress={() => console.log('Flashcard set clicked')}
            subject={item.subject}
            flashcardCount={item.flashcardCount}
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
