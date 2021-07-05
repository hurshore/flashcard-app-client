import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import colors from '../../config/colors';

const FlashcardSetSkeleton = ({}) => {
  return (
    <View style={styles.skeleton}>
      <SkeletonPlaceholder>
        <View style={styles.title} />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View style={styles.subtitle} />
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  subtitle: {
    borderRadius: 5,
    height: 10,
    marginTop: 8,
    width: 100,
  },
  title: {
    height: 15,
    width: 200,
    borderRadius: 4,
  },
});

export default FlashcardSetSkeleton;
