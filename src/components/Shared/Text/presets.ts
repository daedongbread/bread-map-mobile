import { StyleSheet } from 'react-native';
import { resizePixels } from '@/utils';

const FONT_FAMILY = {
  bold: 'Pretendard-Bold',
  semibold: 'Pretendard-SemiBold',
  medium: 'Pretendard-Medium',
};
export const presets = StyleSheet.create(
  resizePixels({
    heading1: {
      fontSize: 24,
      fontFamily: FONT_FAMILY.bold,
      lineHeight: 32,
      letterSpacing: -(36 * 0.02),
    },
    heading2: {
      fontSize: 20,
      fontFamily: FONT_FAMILY.bold,
      lineHeight: 28,
    },
    subhead: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: FONT_FAMILY.bold,
    },
    body1: {
      fontSize: 16,
      lineHeight: 22,
      fontFamily: FONT_FAMILY.medium,
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: -14 * 0.02,
      fontFamily: FONT_FAMILY.medium,
    },
    caption1: {
      fontSize: 13,
      lineHeight: 18,
      fontFamily: FONT_FAMILY.medium,
    },
    caption2: {
      fontSize: 12,
      // lineHeight: 16,
      fontFamily: FONT_FAMILY.medium,
    },
    caption3: {
      fontSize: 10,
      fontFamily: FONT_FAMILY.medium,
    },
    bold: {
      fontFamily: FONT_FAMILY.bold,
    },
    semibold: {
      fontFamily: FONT_FAMILY.semibold,
    },
    medium: {
      fontFamily: FONT_FAMILY.medium,
    },
    subTitle1: {
      fontSize: 24,
      fontWeight: '700',
    },
    black: {
      color: 'black',
    },
    opacity1: {
      opacity: 0.8,
    },
  })
);

export type TextPresets = keyof typeof presets;
