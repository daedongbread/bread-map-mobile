import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';
import { Button } from '../Button/Button';

type Props = {
  onPress: () => void;
};

export const ReportMenuButton = ({ onPress }: Props) => (
  <Button
    icon
    size="large"
    presets={['body2', 'bold']}
    appearance="terdary"
    style={styles.footerButton}
    onPress={onPress}
  >
    빵 메뉴 제보하기
  </Button>
);

const styles = StyleSheet.create({
  footerButton: {
    marginVertical: 24,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  footerIcon: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  footerButtonText: {
    color: theme.color.gray700,
    textAlignVertical: 'center',
  },
});
