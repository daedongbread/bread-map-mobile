import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';
import { Button } from '../Button/Button';

type Props = {
  onPress: () => void;
};

export const ReportMenuButton = ({ onPress }: Props) => (
  <Button icon size="large" appearance="terdary" style={styles.footerButton} onPress={onPress}>
    빵 메뉴 제보하기
    {/* <View style={styles.buttonContainer}>
      <PlusIcon color={'#BDBDBD'} style={styles.footerIcon} />
      <SplitColumn width={4} />
      <Text presets={['body2', 'bold']} style={styles.footerButtonText}>
        빵 메뉴 제보하기
      </Text>
    </View> */}
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
