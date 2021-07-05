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
import { HomeScreenParamList } from '../navigation/types';

interface FlashcardSet {
  id: string;
  name: string;
}

type HomeScreenNavigationProp = StackNavigationProp<
  HomeScreenParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const exploreApi = useApi(flashcardApi.getRandomFlashcards);

  useEffect(() => {
    exploreApi.request();
  }, []);

  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>Explore</Text>
      {!exploreApi.loading ? (
        <FlatList
          data={exploreApi.data}
          keyExtractor={(item: FlashcardSet) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FlashcardSet
              onPress={() =>
                navigation.navigate('ViewFlashcard', {
                  id: item.id,
                  random: true,
                  subject: item.name,
                })
              }
              subject={item.name}
              flashcardCount={20}
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

export default HomeScreen;
