import React from 'react';
import { Text } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';

import colors from '../../config/colors';

const FlashcardSetSkeleton = ({}) => {
  return (
    <SkeletonContent
      containerStyle={{
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 15,
        marginBottom: 20,
        padding: 15,
      }}
      isLoading={true}
      layout={[
        { key: 'someId', width: 220, height: 15, marginBottom: 10 },
        { key: 'someOtherId', width: 150, height: 13 },
      ]}
    >
      <Text>Your content</Text>
      <Text>Other content</Text>
    </SkeletonContent>
  );
};

export default FlashcardSetSkeleton;
