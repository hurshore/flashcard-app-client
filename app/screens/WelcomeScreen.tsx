import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import AppButton from '../components/Button';

import Screen from '../components/Screen';
import Text from '../components/Text';
import colors from '../config/colors';

const WelcomeScreen = () => {
  return (
    <Screen style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
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
    padding: 16,
  },
  image: {
    width: '100%',
    marginTop: 30,
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
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: 100,
  },
  logo: {
    marginBottom: 20,
  },
  mainText: {
    fontSize: 30,
    marginBottom: 50,
    marginTop: 30,
  },
  textContainer: {
    // flex: 1,
  },
});

export default WelcomeScreen;
