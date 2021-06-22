import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import AppButton from '../components/Button';
import Logo from '../components/Logo';

import Screen from '../components/Screen';
import Text from '../components/Text';
import colors from '../config/colors';

const WelcomeScreen = () => {
  return (
    <Screen style={styles.container}>
      <Logo />
      <Image
        source={require('../assets/welcomeImage.png')}
        style={styles.image}
      />
      <View style={styles.intro}>
        <Text style={styles.infoText}>Get started</Text>
        <Text style={styles.mainText}>Learn in a fun way with flashcards</Text>
        <AppButton onPress={() => console.log('Button clicked')} title="Next" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    marginTop: 40,
  },
  imageContainer: {
    flex: 1,
    margin: 'auto',
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
