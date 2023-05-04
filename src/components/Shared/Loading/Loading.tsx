import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.loadingWrapper}>
      <AnimatedLottieView
        source={require('@/assets/lottiles/loading.json')}
        // loop
        autoPlay
        resizeMode={'center'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
