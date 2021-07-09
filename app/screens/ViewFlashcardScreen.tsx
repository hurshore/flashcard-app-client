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
import { StackNavigationProp } from '@react-navigation/stack';

import Screen from '../components/Screen';
import colors from '../config/colors';
import Text from '../components/Text';
import Button from '../components/Button';
import CardFlip from '../components/CardFlip';
import FlipCardContext from '../context/flipcard';
import flashcardApi from '../api/flashcard';
import useApi from '../hooks/useApi';
import { AppStackParamList } from '../navigation/types';
import ActivityIndicator from '../components/ActivityIndicator';

interface FlashcardApiProp {
  request: (...args: any[]) => void;
  data: { _id: string; question: string; answer: string }[];
  loading: boolean;
  setData: (arg: any) => void;
}

type NavigationProp = StackNavigationProp<AppStackParamList, 'ViewFlashcard'>;

interface ViewFlashcardsProps {
  subject: string;
  navigation: NavigationProp;
  route: RouteProp<AppStackParamList, 'ViewFlashcard'>;
}

const ViewFlashcardScreen = ({ route, navigation }: ViewFlashcardsProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [delayAnimation, setDelayAnimation] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { flipped, flipCard } = useContext(FlipCardContext);
  const isInitialMount = useRef(true);
  const modalRef = useRef();
  const { id, random, subject, flashcardCount } = route.params;
  const { request: deleteFlashcard, loading: deleteLoading } = useApi(
    flashcardApi.deleteFlashcard
  );
  const {
    request: getFlashcard,
    data: flashcards,
    loading: flashcardLoading,
    setData,
  }: FlashcardApiProp = useApi(
    random ? flashcardApi.getRandomFlashcard : flashcardApi.getUserFlashcard
  );

  useEffect(() => {
    getFlashcard(id, flashcardCount);
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

  const handleDelete = async () => {
    const id = flashcards[currentNumber - 1]._id;
    const response = await deleteFlashcard(id);
    if (!response.ok) return;
    const newFlashcards = flashcards.filter(
      (flashcard) => flashcard._id !== id
    );
    console.log(newFlashcards);
    setData(newFlashcards);
    if (currentNumber > 1) setCurrentNumber(currentNumber - 1);
    else if (newFlashcards.length < 1) navigation.goBack();
    setModalOpen(false);
  };

  return (
    <>
      <ActivityIndicator visible={deleteLoading || flashcardLoading} />
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
            {!flashcardLoading && flashcards.length > 0 ? (
              <CardFlip
                frontText={flashcards[currentNumber - 1].question}
                backText={flashcards[currentNumber - 1].answer}
                delay={delayAnimation}
                setModalOpen={() => setModalOpen(true)}
              />
            ) : (
              <View style={styles.cardFlip} />
            )}
          </View>
          <View style={styles.progress}>
            <Progress.Bar
              animated
              borderRadius={20}
              color={colors.primary}
              height={18}
              progress={
                currentNumber /
                (flashcards.length > 0 ? flashcards.length : flashcardCount)
              }
              borderColor="transparent"
              unfilledColor="#DBDBF6"
              width={null}
            />
            <Text style={styles.progressCount}>
              {currentNumber}/
              {flashcards.length > 0 ? flashcards.length : flashcardCount}
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
          <TouchableHighlight
            underlayColor={colors.light}
            onPress={() => console.log('Clicked 1')}
          >
            <View style={styles.modalContent}>
              <Text>Edit</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={colors.light}
            onPress={handleDelete}
          >
            <View style={styles.modalContent}>
              <Text style={styles.delete}>Delete</Text>
            </View>
          </TouchableHighlight>
        </Modal>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  cardFlip: {
    backgroundColor: colors.white,
    borderRadius: 30,
    height: '100%',
    width: '100%',
  },
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
