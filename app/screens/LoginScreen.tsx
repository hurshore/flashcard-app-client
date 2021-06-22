import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Logo from '../components/Logo';

import Screen from '../components/Screen';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import colors from '../config/colors';

const LoginScreen = () => {
  return (
    <Screen style={styles.container}>
      <Logo />
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Hey,{'\n'}Log in Now</Text>
        <Text style={styles.infoText}>
          If you are new / <Text style={styles.link}>Register</Text>
        </Text>
        <View style={styles.form}>
          <TextInput placeholder="Email" />
          <TextInput placeholder="Password" />
          <Text style={styles.infoText}>
            Forgot password? / <Text style={styles.link}>Reset</Text>
          </Text>
        </View>
        <Button
          onPress={() => console.log('Log in button clicked')}
          title="Log in"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  form: {
    marginVertical: 40,
  },
  infoText: {
    color: colors.medium,
    fontSize: 16,
  },
  link: {
    fontWeight: '700',
    color: colors.primary,
  },
  mainContent: {
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },
});

export default LoginScreen;
