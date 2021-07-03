import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';

import Logo from '../components/Logo';
import Screen from '../components/Screen';
import Text from '../components/Text';
import colors from '../config/colors';
import { AuthStackParamList } from '../navigation/types';
import {
  Form,
  SubmitButton,
  FormField,
  ErrorMessage,
} from '../components/forms';
import authApi from '../api/auth';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

interface FormValues {
  email: string;
  password: string;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const auth = useAuth();
  const loginApi = useApi(authApi.login);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }: FormValues) => {
    const response = await loginApi.request(email, password);
    if (!response.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(response.data);
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen style={styles.container}>
        <Logo />
        <View style={styles.mainContent}>
          <Text style={styles.welcomeText}>Hey,{'\n'}Log in Now</Text>
          <View style={styles.register}>
            <Text style={styles.infoText}>If you are new / </Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.link}>Register</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.form}>
            <Form
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <ErrorMessage
                error="Email or password is incorrect"
                visible={loginFailed}
              />
              <View style={styles.fields}>
                <FormField name="email" placeholder="Email" />
                <FormField name="password" placeholder="Password" />
                <Text style={styles.infoText}>
                  Forgot password? / <Text style={styles.link}>Reset</Text>
                </Text>
              </View>
              <SubmitButton title="Log in" />
            </Form>
          </View>
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  fields: {
    marginBottom: 40,
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
    fontWeight: '700',
    color: colors.primary,
  },
  mainContent: {
    marginTop: 50,
  },
  register: {
    flexDirection: 'row',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },
});

export default LoginScreen;
