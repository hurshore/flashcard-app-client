import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Button from '../components/Button';
import Logo from '../components/Logo';
import Screen from '../components/Screen';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import colors from '../config/colors';
import { AuthStackParamList } from '../navigation/types';

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  return (
    <Screen style={styles.container}>
      <Logo />
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Hey,{'\n'}Register Now</Text>
        <View style={styles.login}>
          <Text style={styles.infoText}>Have an account? / </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.link}>Log in</Text>
          </TouchableWithoutFeedback>
        </View>
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
    bottom: 2,
    color: colors.primary,
    fontWeight: '700',
  },
  login: {
    flexDirection: 'row',
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
