import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';

import Screen from '../../components/Screen';
import colors from '../../config/colors';
import Text from '../../components/Text';
import Button from '../../components/Button';
import ActivityIndicator from '../../components/ActivityIndicator';

const ViewFlashcardScreen = ({
  subject,
  count,
}: {
  subject: string;
  count: number;
}) => {
  return (
    <>
      <ActivityIndicator visible={true} />
      <Screen style={styles.container}>
        <View style={styles.subjectContainer}>
          <View style={styles.navButtons}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={colors.white}
              size={40}
            />
            <MaterialCommunityIcons
              name="chevron-right"
              color={colors.white}
              size={40}
            />
          </View>
          <Text style={styles.subject}>{subject}</Text>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.flashcardContainer}></View>
          <View style={styles.progress}>
            <Progress.Bar
              animated
              borderRadius={20}
              color={colors.primary}
              height={18}
              progress={1 / count}
              borderColor="transparent"
              unfilledColor="#DBDBF6"
              width={null}
            />
            <Text style={styles.progressCount}>1 / {count}</Text>
          </View>

          <Button onPress={() => {}} title="Flip Card" />
        </View>
        <StatusBar style="light" backgroundColor={colors.primary} />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  flashcardContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
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
