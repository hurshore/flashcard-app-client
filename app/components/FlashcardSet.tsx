import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import Text from './Text';

interface FlashcardSetProps {
  onPress: (amount: number) => void;
  flashcardCount: number;
  subject: string;
}

const FlashcardSet = ({
  onPress,
  flashcardCount,
  subject,
}: FlashcardSetProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(flashcardCount)}>
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.subject} numberOfLines={1}>
            {subject}
          </Text>
          <Text style={styles.flashcardCount}>
            {flashcardCount} {flashcardCount > 1 ? 'flashcards' : 'flashcard'}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          color={colors.medium}
          size={25}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.white,
    flexDirection: 'row',
    marginBottom: 20,
    overflow: 'hidden',
    padding: 15,
  },
  details: {
    flex: 1,
  },
  flashcardCount: {
    color: colors.medium,
    fontSize: 16,
  },
  subject: {
    fontWeight: 'bold',
    marginBottom: 7,
  },
});

export default FlashcardSet;
