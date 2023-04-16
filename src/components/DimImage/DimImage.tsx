import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@shared/Text';

type Props = {
  show?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const DimImage = ({ show = true, style }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} style={[styles.dimWrapper, style && style]}>
      <Text color={'white'} presets={['caption2', 'bold']}>
        이미지 준비중
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  dimWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
