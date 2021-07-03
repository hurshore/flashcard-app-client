import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';

interface TextInputProps {
  numberOfLines?: number;
  placeholder: string;
  textAlignVertical?: 'center' | 'auto' | 'top' | 'bottom';
  onChangeText?: (text: any) => void;
  onBlur?: () => void;
  value?: string;
}

const AppTextInput = ({
  numberOfLines = 1,
  placeholder,
  textAlignVertical = 'center',
  onChangeText,
  onBlur,
  value,
  ...otherProps
}: TextInputProps) => {
  return (
    <TextInput
      onBlur={onBlur}
      onChangeText={onChangeText}
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      placeholderTextColor={colors.medium}
      style={styles.input}
      textAlignVertical={textAlignVertical}
      value={value}
      {...otherProps}
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
