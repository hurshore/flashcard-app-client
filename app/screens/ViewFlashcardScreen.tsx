import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import { AppStackParamList } from '../navigation/types';
import ActivityIndicator from '../components/ActivityIndicator';
import StatusBar from '../components/StatusBar';
import { useFlashcard, useDispatchFlashcard } from '../context/flashcard';
import * as actionTypes from '../context/actiontypes';

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
  const [flashcardLoading, setFlashcardLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { flipped, flipCard } = useContext(FlipCardContext);
  const isInitialMount = useRef(true);
  const modalRef = useRef();
  const { id: flashcardSetId, random, subject, flashcardCount } = route.params;
  const { openFlashcardSet: flashcards } = useFlashcard();
  const dispatch = useDispatchFlashcard();

  useEffect(() => {
    getFlashcard(flashcardSetId, flashcardCount);

    return () => {
      dispatch({ type: actionTypes.SET_OPEN_FLASHCARD_SET, payload: [] });
    };
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setDelayAnimation(true);
    }
  }, [currentNumber]);

  const getFlashcard = async (id: string, flashcardCount: number) => {
    setFlashcardLoading(true);

    const response: any = random
      ? await flashcardApi.getRandomFlashcard(id, flashcardCount)
      : await flashcardApi.getUserFlashcard(id);

    setFlashcardLoading(false);

    if (!response.ok) {
      alert(response.data.error);
      navigation.goBack();
    }

    dispatch({
      type: actionTypes.SET_OPEN_FLASHCARD_SET,
      payload: response.data,
    });
  };

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
    setDeleting(true);
    const id = flashcards[currentNumber - 1]._id;
    const response = await flashcardApi.deleteFlashcard(id);
    setDeleting(false);

    if (!response.ok) return alert('Something went wrong');

    const newFlashcards = flashcards.filter(
      (flashcard) => flashcard._id !== id
    );

    dispatch({
      type: actionTypes.SET_OPEN_FLASHCARD_SET,
      payload: newFlashcards,
    });

    dispatch({
      type: actionTypes.DELETE_FLASHCARD,
      payload: { id: flashcardSetId },
    });

    if (currentNumber > 1) setCurrentNumber(currentNumber - 1);
    else if (newFlashcards.length < 1) navigation.goBack();
    setModalOpen(false);
  };

  const handleEdit = async () => {
    navigation.navigate('EditFlashcard', {
      id: flashcards[currentNumber - 1]._id,
      subject: subject,
      question: flashcards[currentNumber - 1].question,
      answer: flashcards[currentNumber - 1].answer,
    });
    setModalOpen(false);
  };

  return (
    <>
      <StatusBar style="light" {...{ backgroundColor: colors.primary }} />
      <ActivityIndicator visible={deleting || flashcardLoading} />
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
        <Modal
          position="center"
          style={styles.modal}
          ref={modalRef}
          isOpen={modalOpen}
          onClosed={() => setModalOpen(false)}
        >
          <TouchableHighlight underlayColor={colors.light} onPress={handleEdit}>
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
