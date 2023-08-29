import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';

export const NewBakeryChip = () => {
  return (
    <View style={styles.baseline}>
      <View style={styles.container}>
        <Text presets={['caption2', 'semibold']} color={'primary600'}>
          빵순 제보
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseline: {
    alignItems: 'baseline',
  },
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.color.primary600,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
});
