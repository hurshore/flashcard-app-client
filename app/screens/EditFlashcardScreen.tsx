import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen from '../components/Screen';
import Text from '../components/Text';
import colors from '../config/colors';
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from '../components/forms';
import useApi from '../hooks/useApi';
import flashcardApi from '../api/flashcard';
import UploadScreen from './UploadScreen';
import { AppStackParamList } from '../navigation/types';
import { useFlashcard, useDispatchFlashcard } from '../context/flashcard';
import * as actionTypes from '../context/actiontypes';

const validationSchema = Yup.object().shape({
  subject: Yup.string().required().label('Subject'),
  question: Yup.string().required().label('Question'),
  answer: Yup.string().required().label('Answer'),
});

interface FormValues {
  subject: string;
  question: string;
  answer: string;
}

type NavigationProp = StackNavigationProp<AppStackParamList, 'EditFlashcard'>;

interface EditFlashcardsProps {
  navigation: NavigationProp;
  route: RouteProp<AppStackParamList, 'EditFlashcard'>;
}

const EditFlashcardScreen = ({ navigation, route }: EditFlashcardsProps) => {
  const editApi = useApi(flashcardApi.editFlashcard);
  const [requestFailed, setRequestFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const { id, subject, question, answer } = route.params;
  const { openFlashcardSet } = useFlashcard();
  const dispatch = useDispatchFlashcard();

  const handleSubmit = async (
    { subject, question, answer }: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setProgress(0);
    setUploadVisible(true);
    const response = await editApi.request(
      { id, subject, question, answer },
      (progress: number) => setProgress(progress)
    );

    if (!response.ok) {
      setUploadVisible(false);
      return setRequestFailed(true);
    }

    const newFlashcardSet = openFlashcardSet.map((card) =>
      card._id !== id ? card : { ...card, question, answer }
    );

    dispatch({
      type: actionTypes.SET_OPEN_FLASHCARD_SET,
      payload: newFlashcardSet,
    });

    setRequestFailed(false);
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => navigation.goBack()}
        progress={progress}
        visible={uploadVisible}
      />
      <Text style={styles.header}>Edit Flashcard</Text>
      <Form
        initialValues={{ subject, question, answer }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ErrorMessage error="Something went wrong" visible={requestFailed} />
        <View style={styles.field}>
          <FormField
            name="subject"
            placeholder="New or existing subject"
            {...{ editable: false }}
          />
          <FormField
            name="question"
            placeholder="Question"
            {...{ numberOfLines: 5, textAlignVertical: 'top' }}
          />
          <FormField
            name="answer"
            placeholder="Answer"
            {...{ numberOfLines: 5, textAlignVertical: 'top' }}
          />
        </View>
        <SubmitButton title="Edit Card" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
  },
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  field: {
    marginBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EditFlashcardScreen;
