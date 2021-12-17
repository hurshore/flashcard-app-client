import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen from '../components/Screen';
import FlashcardSet from '../components/FlashcardSet';
import Text from '../components/Text';
import colors from '../config/colors';
import flashcardApi from '../api/flashcard';
import FlashcardSetSkeleton from '../components/skeletons/FlashcardSetSkeleton';
import { AppStackParamList } from '../navigation/types';
import { useFlashcard, useDispatchFlashcard } from '../context/flashcard';
import * as actionTypes from '../context/actiontypes';

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
  const [loading, setLoading] = useState(false);
  const { flashcardSets } = useFlashcard();
  const dipsatch = useDispatchFlashcard();

  useEffect(() => {
    fetchFlashcardSets();
  }, []);

  const fetchFlashcardSets = async () => {
    setLoading(true);
    const response: any = await flashcardApi.getUserFlashcards();
    setLoading(false);

    if (!response.ok) return alert(response.data.error);

    dipsatch({
      type: actionTypes.SET_USER_FLASHCARD_SETS,
      payload: response.data,
    });
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>My Flashcards</Text>
      {!loading ? (
        <FlatList
          data={flashcardSets}
          keyExtractor={(item: FlashcardSet) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={fetchFlashcardSets}
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
