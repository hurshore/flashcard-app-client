import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

type style = 'auto' | 'dark' | 'light' | 'inverted';

const FocusAwareStatusBar = ({ style, ...otherProps }: { style: style }) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar style={style} {...otherProps} /> : null;
};

export default FocusAwareStatusBar;
