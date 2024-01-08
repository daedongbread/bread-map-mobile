import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';
import { Text } from '../Shared/Text';

type Props = {
  onPress: () => void;
};

export const ViewMoreButton = ({ onPress }: Props) => (
  <Pressable style={styles.container} onPress={onPress}>
    <Text color={theme.color.gray900} presets={['body2', 'regular']}>
      전체보기
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.gray300,
  },
});
