import React, { useState, useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';

import Screen from '../components/Screen';
import colors from '../config/colors';
import Text from '../components/Text';
import Button from '../components/Button';

interface ViewFlashcardsProps {
  flashcards: {
    question: string;
    answer: string;
  }[];
  subject: string;
}

const ViewFlashcardScreen = ({ flashcards, subject }: ViewFlashcardsProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = (): void => {
    if (!flipped) {
      Animated.spring(flipAnim, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setFlipped(true);
    } else {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setFlipped(false);
    }
  };

  const goToNextCard = (): void => {
    if (currentNumber < flashcards.length) setCurrentNumber(currentNumber + 1);
  };

  const goToPreviousCard = (): void => {
    if (currentNumber > 1) setCurrentNumber(currentNumber - 1);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.subjectContainer}>
        <View style={styles.navButtons}>
          <TouchableWithoutFeedback onPress={goToPreviousCard}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={colors.white}
              size={40}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={goToNextCard}>
            <MaterialCommunityIcons
              name="chevron-right"
              color={colors.white}
              size={40}
            />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.subject}>{subject}</Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.flashcardContainer}>
          <Animated.View
            style={[
              styles.flipcard,
              {
                transform: [{ rotateY: frontInterpolate }],
                zIndex: !flipped ? 1 : 0,
              },
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.cardContainerStyle}
              style={styles.card}
            >
              <View style={styles.flashcard}>
                <Text style={styles.cardText}>
                  {flashcards[currentNumber - 1].question}
                </Text>
              </View>
            </ScrollView>
          </Animated.View>

          <Animated.View
            style={[
              styles.flipcard,
              styles.flipcardBack,
              {
                transform: [{ rotateY: backInterpolate }],
                zIndex: flipped ? 1 : 0,
              },
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.cardContainerStyle}
              style={styles.card}
            >
              <View style={styles.flashcard}>
                <Text style={styles.cardText}>
                  {flashcards[currentNumber - 1].answer}
                </Text>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
        <View style={styles.progress}>
          <Progress.Bar
            animated
            borderRadius={20}
            color={colors.primary}
            height={18}
            progress={currentNumber / flashcards.length}
            borderColor="transparent"
            unfilledColor="#DBDBF6"
            width={null}
          />
          <Text style={styles.progressCount}>
            {currentNumber}/{flashcards.length}
          </Text>
        </View>

        <Button onPress={flipCard} title="Flip Card" />
      </View>
      <StatusBar style="light" backgroundColor={colors.primary} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
  },
  cardContainerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%',
  },
  cardText: {
    textAlign: 'center',
  },
  container: {
    backgroundColor: colors.light,
  },
  flashcard: {
    padding: 15,
  },
  flipcard: {
    backgroundColor: 'red',
    backfaceVisibility: 'hidden',
    borderRadius: 30,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  flipcardBack: {
    bottom: '100%',
  },
  flashcardContainer: {
    alignItems: 'center',
    bottom: '8%',
    height: '55%',
  },
  mainContent: {
    paddingHorizontal: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 600,
    width: '90%',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progress: {
    marginBottom: 30,
  },
  progressCount: {
    color: colors.medium,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subject: {
    color: colors.white,
    fontSize: 30,
    margin: 10,
    textAlign: 'center',
  },
  subjectContainer: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: '30%',
    padding: 10,
    width: '100%',
  },
});

export default ViewFlashcardScreen;
