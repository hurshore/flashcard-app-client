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

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const auth = useAuth();
  const registerApi = useApi(authApi.register);
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleSubmit = async ({ name, email, password }: FormValues) => {
    const response = await registerApi.request(name, email, password);
    if (!response.ok) return setRegisterFailed(true);
    setRegisterFailed(false);
    auth.logIn(response.data);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />
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
            <Form
              initialValues={{ name: '', email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <ErrorMessage
                error={registerApi.error}
                visible={registerFailed}
              />
              <View style={styles.fields}>
                <FormField name="name" placeholder="Name" />
                <FormField name="email" placeholder="Email" />
                <FormField name="password" placeholder="Password" />
              </View>
              <SubmitButton title="Register" />
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
