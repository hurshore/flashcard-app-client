import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../config/styles';

interface AppTextProps {
  children: React.ReactNode;
  style?: object;
}

const AppText = ({ children, style, ...otherProps }: AppTextProps) => {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
