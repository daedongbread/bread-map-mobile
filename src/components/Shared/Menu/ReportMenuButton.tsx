import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { Button } from '../Button/Button';
import { PlusIcon } from '../Icons';
import { SplitColumn } from '../SplitSpace';
import { Text } from '../Text';

type Props = {
  onPress: () => void;
};

export const ReportMenuButton = ({ onPress }: Props) => (
  <Button size="large" appearance="terdary" style={styles.footerButton} onPress={onPress}>
    <View style={styles.buttonContainer}>
      <PlusIcon color={'#BDBDBD'} style={styles.footerIcon} />
      <SplitColumn width={4} />
      <Text presets={['body2', 'bold']} style={styles.footerButtonText}>
        빵 메뉴 제보하기
      </Text>
    </View>
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
