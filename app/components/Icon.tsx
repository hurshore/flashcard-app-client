import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconProps {
  name: any;
  color?: string;
  backgroundColor: string;
  size?: number;
}

const Icon = ({
  name,
  color = 'white',
  backgroundColor,
  size = 40,
}: IconProps) => {
  return (
    <View
      style={[
        styles.icon,
        { backgroundColor, borderRadius: size / 2, height: size, width: size },
      ]}
    >
      <MaterialCommunityIcons name={name} color={color} size={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Icon;
