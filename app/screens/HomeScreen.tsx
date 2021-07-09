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
import { getRandomInt, createRandomArray } from '../utility/functions';

interface FlashcardSet {
  id: string;
  name: string;
}

type NavigationProp = StackNavigationProp<AppStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: NavigationProp;
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
          refreshing={exploreApi.loading}
          onRefresh={() => exploreApi.request()}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <FlashcardSet
              onPress={(count: number) =>
                navigation.navigate('ViewFlashcard', {
                  id: item.id,
                  random: true,
                  subject: item.name,
                  flashcardCount: count,
                })
              }
              subject={item.name}
              flashcardCount={getRandomInt(10, 20)}
            />
          )}
        />
      ) : (
        <FlatList
          data={createRandomArray(7)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={FlashcardSetSkeleton}
        />
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
