import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';

interface TextInputProps {
  placeholder: string;
}

const AppTextInput = ({ placeholder }: TextInputProps) => {
  return <TextInput placeholder={placeholder} style={styles.input} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.light,
    borderRadius: 25,
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default AppTextInput;
