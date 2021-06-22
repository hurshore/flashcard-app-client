import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';

interface TextInputProps {
  numberOfLines?: number;
  placeholder: string;
  textAlignVertical?: 'center' | 'auto' | 'top' | 'bottom';
}

const AppTextInput = ({
  numberOfLines = 1,
  placeholder,
  textAlignVertical = 'center',
}: TextInputProps) => {
  return (
    <TextInput
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      style={styles.input}
      textAlignVertical={textAlignVertical}
    />
  );
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
