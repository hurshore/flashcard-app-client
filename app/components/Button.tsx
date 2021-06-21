import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import AppText from './Text';
import colors from '../config/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const AppButton = ({ title, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.white,
  },
});

export default AppButton;
