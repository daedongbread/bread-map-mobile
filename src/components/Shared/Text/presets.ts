import { StyleSheet } from 'react-native';
import { resizePixels } from '@/utils';

export const presets = StyleSheet.create(
  resizePixels({
    h1: {
      fontSize: 36,
      fontWeight: 'bold',
      lineHeight: 42,
      letterSpacing: -(36 * 0.02),
    },
    h2: {
      fontSize: 30,
      fontWeight: 'bold',
      lineHeight: 38,
    },
    subtitle1: {
      fontSize: 24,
      lineHeight: 32,
    },
    subtitle2: {
      fontSize: 18,
      lineHeight: 24,
    },
    body1: {
      fontSize: 16,
      lineHeight: 22,
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: -14 * 0.02,
    },
    number1: {
      fontSize: 16,
      lineHeight: 22,
    },
    number2: {
      fontSize: 14,
      lineHeight: 20,
    },
    number3: {
      fontSize: 12,
      lineHeight: 16,
    },
    caption1: {
      fontSize: 12,
      lineHeight: 18,
    },
    caption2: {
      fontSize: 11,
      lineHeight: 16,
    },
    bold: {
      fontWeight: 'bold',
    },
    medium: {
      fontWeight: '500',
    },
    regular: {
      fontWeight: '400',
    },
    light: {
      fontWeight: '300',
    },
  })
);

export type TextPresets = keyof typeof presets;
