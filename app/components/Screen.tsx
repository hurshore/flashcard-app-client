import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

interface ScreenProps {
  children: React.ReactNode;
  style: object;
}

const Screen = ({ children, style }: ScreenProps) => (
  <SafeAreaView style={[styles.screen, style]}>
    <View style={[styles.view, style]}>{children}</View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
