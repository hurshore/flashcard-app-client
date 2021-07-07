import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen from '../components/Screen';
import FlashcardSet from '../components/FlashcardSet';
import Text from '../components/Text';
import colors from '../config/colors';
import flashcardApi from '../api/flashcard';
import useApi from '../hooks/useApi';
import FlashcardSetSkeleton from '../components/skeletons/FlashcardSetSkeleton';
import { AppStackParamList } from '../navigation/types';

interface FlashcardSet {
  _id: string;
  subject: string;
  flashcardCount: number;
}

type NavigationProp = StackNavigationProp<AppStackParamList, 'MyFlashcards'>;

interface Props {
  navigation: NavigationProp;
}

const UserFlashcardsScreen = ({ navigation }: Props) => {
  const userFlashcardsApi = useApi(flashcardApi.getUserFlashcards);

  useEffect(() => {
    userFlashcardsApi.request();
  }, []);

  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>My Flashcards</Text>
      {!userFlashcardsApi.loading ? (
        <FlatList
          data={userFlashcardsApi.data}
          keyExtractor={(item: FlashcardSet) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FlashcardSet
              onPress={(count: number) =>
                navigation.navigate('ViewFlashcard', {
                  id: item._id,
                  random: false,
                  subject: item.subject,
                  flashcardCount: count,
                })
              }
              subject={item.subject}
              flashcardCount={item.flashcardCount}
            />
          )}
        />
      ) : (
        Array(7)
          .fill('x')
          .map((_, index) => <FlashcardSetSkeleton key={index} />)
      )}
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

export default UserFlashcardsScreen;
