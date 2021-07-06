import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import colors from '../config/colors';

interface Props {
  progress: number;
  visible: boolean;
  onDone: () => void;
}

const UploadScreen = ({ progress, visible, onDone }: Props) => {
  return (
    <Modal visible={visible} statusBarTranslucent>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar
            progress={progress}
            color={colors.primary}
            width={200}
          />
        ) : (
          <View>
            <LottieView
              autoPlay
              loop={false}
              onAnimationFinish={onDone}
              resizeMode="cover"
              source={require('../assets/animation/done.json')}
              style={styles.animation}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default UploadScreen;
