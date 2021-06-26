import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';

import Screen from '../components/Screen';
import colors from '../config/colors';
import Text from '../components/Text';
import Button from '../components/Button';
import CardFlip from '../components/CardFlip';
import FlipCardContext from '../context/flipcard';

interface ViewFlashcardsProps {
  flashcards: {
    question: string;
    answer: string;
  }[];
  subject: string;
}

const ViewFlashcardScreen = ({ flashcards, subject }: ViewFlashcardsProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [delayAnimation, setDelayAnimation] = useState(true);
  const { flipped, flipCard } = useContext(FlipCardContext);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setDelayAnimation(true);
    }
  }, [currentNumber]);

  const goToNextCard = (): void => {
    if (currentNumber < flashcards.length) setCurrentNumber(currentNumber + 1);
    if (flipped) flipCard();
    setDelayAnimation(false);
  };

  const goToPreviousCard = (): void => {
    if (currentNumber > 1) setCurrentNumber(currentNumber - 1);
    if (flipped) flipCard();
    setDelayAnimation(false);
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
          <CardFlip
            frontText={flashcards[currentNumber - 1].question}
            backText={flashcards[currentNumber - 1].answer}
            delay={delayAnimation}
          />
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
  container: {
    backgroundColor: colors.light,
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
