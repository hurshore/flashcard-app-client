import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import Text from '../Text';

interface ErrorProps {
  error: string | undefined | null;
  visible: boolean | undefined;
}

const ErrorMessage = ({ error, visible }: ErrorProps) => {
  if (!visible || !error) return null;
  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    fontSize: 16,
  },
});

export default ErrorMessage;
