import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Logo from '../components/Logo';

import Screen from '../components/Screen';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import colors from '../config/colors';

const RegisterScreen = () => {
  return (
    <Screen style={styles.container}>
      <Logo />
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Hey,{'\n'}Register Now</Text>
        <Text style={styles.infoText}>
          Have an account? / <Text style={styles.link}>Log in</Text>
        </Text>
        <View style={styles.form}>
          <TextInput placeholder="Name" />
          <TextInput placeholder="Email" />
          <TextInput placeholder="Password" />
        </View>
        <Button
          onPress={() => console.log('Register button clicked')}
          title="Register"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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

export default RegisterScreen;
