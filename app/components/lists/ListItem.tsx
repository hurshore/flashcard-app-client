import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Text from '../Text';
import colors from '../../config/colors';

interface ListItemProps {
  title: string;
  subtitle?: string;
  IconComponent: JSX.Element;
}

const ListItem = ({ title, subtitle, IconComponent }: ListItemProps) => {
  return (
    <View style={styles.container}>
      {IconComponent}
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        color={colors.medium}
        size={25}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginLeft: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 10,
  },
  subtitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default ListItem;
