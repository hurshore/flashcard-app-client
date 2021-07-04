import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../config/styles';

interface AppTextProps {
  children: React.ReactNode;
  numberOfLines?: number;
  style?: object;
}

const AppText = ({
  children,
  style,
  numberOfLines,
  ...otherProps
}: AppTextProps) => {
  return (
    <Text
      style={[defaultStyles.text, style]}
      {...otherProps}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default AppText;
