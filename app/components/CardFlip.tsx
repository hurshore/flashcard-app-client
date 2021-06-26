import React, { useRef, useContext, useEffect } from 'react';
import { Animated, View, StyleSheet, ScrollView } from 'react-native';

import colors from '../config/colors';
import FlipCardContext from '../context/flipcard';
import Text from './Text';

interface CardFlipProps {
  frontText: string;
  backText: string;
  delay: boolean;
}

const CardFlip = ({ frontText, backText, delay }: CardFlipProps) => {
  const { flipped } = useContext(FlipCardContext);
  const isInitialMount = useRef(true);

  const flipAnim = useRef(new Animated.Value(0)).current;
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (flipped) {
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: delay ? 400 : 0,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(flipAnim, {
          toValue: 0,
          duration: delay ? 400 : 0,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [flipped]);

  const flipCard = (): void => {
    if (!flipped) {
      Animated.spring(flipAnim, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.flipcard,
          {
            transform: [{ rotateY: frontInterpolate }],
            zIndex: !flipped ? 1 : 0,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.cardContainerStyle}
          style={styles.card}
        >
          <View style={styles.flashcard}>
            <Text style={styles.cardText}>{frontText}</Text>
          </View>
        </ScrollView>
      </Animated.View>

      <Animated.View
        style={[
          styles.flipcard,
          styles.flipcardBack,
          {
            transform: [{ rotateY: backInterpolate }],
            zIndex: flipped ? 1 : 0,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.cardContainerStyle}
          style={styles.card}
        >
          <View style={styles.flashcard}>
            <Text style={styles.cardText}>{backText}</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
  },
  cardContainerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%',
  },
  cardText: {
    textAlign: 'center',
  },
  flashcard: {
    padding: 15,
  },
  flipcard: {
    backfaceVisibility: 'hidden',
    borderRadius: 30,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  flipcardBack: {
    bottom: '100%',
  },
});

export default CardFlip;
