import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import AppButton from '../components/Button';
import Logo from '../components/Logo';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthStackParamList } from '../navigation/types';
import Screen from '../components/Screen';
import Text from '../components/Text';
import colors from '../config/colors';

type WelcomeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <Screen style={styles.container}>
      <Logo />
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/welcomeImage.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.intro}>
        <Text style={styles.infoText}>Get started</Text>
        <Text style={styles.mainText}>Learn in a fun way with flashcards</Text>
        <AppButton
          onPress={() => navigation.navigate('Register')}
          title="Next"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    marginTop: 40,
  },
  imageContainer: {
    alignItems: 'center',
  },
  infoText: {
    color: colors.medium,
    fontSize: 20,
  },
  intro: {
    flex: 1,
    marginTop: 100,
  },
  logo: {
    marginBottom: 20,
  },
  mainText: {
    fontSize: 30,
    marginBottom: 50,
    marginTop: 10,
  },
});

export default WelcomeScreen;
