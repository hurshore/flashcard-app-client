import React from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../components/Button';
import Screen from '../components/Screen';
import Text from '../components/Text';
import TextInput from '../components/TextInput';

const CreateFlashcardScreen = ({}) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>Create a New Flashcard</Text>
      <TextInput placeholder="New or existing subject" />
      <TextInput
        placeholder="Question"
        numberOfLines={5}
        textAlignVertical="top"
      />
      <TextInput
        placeholder="Answer"
        numberOfLines={3}
        textAlignVertical="top"
      />
      <Button
        onPress={() => console.log('Add card button clicked')}
        style={styles.button}
        title="Add Card"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
  },
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CreateFlashcardScreen;
