import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modalbox';
import { RouteProp } from '@react-navigation/native';

import Screen from '../components/Screen';
import colors from '../config/colors';
import Text from '../components/Text';
import Button from '../components/Button';
import CardFlip from '../components/CardFlip';
import FlipCardContext from '../context/flipcard';
import flashcardApi from '../api/flashcard';
import useApi from '../hooks/useApi';
import { HomeScreenParamList } from '../navigation/types';
import ViewFlashcardSkeleton from '../components/skeletons/ViewFlashcardSkeleton';

interface ViewFlashcardsProps {
  subject: string;
  route: RouteProp<HomeScreenParamList, 'ViewFlashcard'>;
}

interface FlashcardApiProp {
  request: (...args: any[]) => void;
  data: { question: string; answer: string }[];
  loading: boolean;
}

const ViewFlashcardScreen = ({ route }: ViewFlashcardsProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [delayAnimation, setDelayAnimation] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { flipped, flipCard } = useContext(FlipCardContext);
  const isInitialMount = useRef(true);
  const modalRef = useRef();
  const {
    request: getFlashcard,
    data: flashcards,
    loading,
  }: FlashcardApiProp = useApi(flashcardApi.getRandomFlashcard);
  const { id, random, subject, flashcardCount } = route.params;

  useEffect(() => {
    if (random) getFlashcard(id, flashcardCount);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setDelayAnimation(true);
    }
  }, [currentNumber]);

  const goToNextCard = (): void => {
    if (currentNumber < flashcards.length) setCurrentNumber(currentNumber + 1);
    if (flipped) {
      setDelayAnimation(false);
      flipCard();
    }
  };

  const goToPreviousCard = (): void => {
    if (currentNumber > 1) setCurrentNumber(currentNumber - 1);
    if (flipped) {
      setDelayAnimation(false);
      flipCard();
    }
  };

  return (
    <>
      {flashcards.length < 1 || loading ? (
        <ViewFlashcardSkeleton count={flashcardCount} subject={subject} />
      ) : (
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
                setModalOpen={() => setModalOpen(true)}
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
          <Modal
            position="center"
            style={styles.modal}
            ref={modalRef}
            isOpen={modalOpen}
            onClosed={() => setModalOpen(false)}
          >
            <TouchableHighlight onPress={() => console.log('Clicked 1')}>
              <View style={styles.modalContent}>
                <Text>Edit</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => console.log('Clicked 2')}>
              <View style={styles.modalContent}>
                <Text style={styles.delete}>Delete</Text>
              </View>
            </TouchableHighlight>
          </Modal>
        </Screen>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  delete: {
    color: colors.danger,
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
  modal: {
    height: 100,
    width: 300,
  },
  modalContent: {
    alignItems: 'center',
    height: '50%',
    flexGrow: 1,
    justifyContent: 'center',
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
