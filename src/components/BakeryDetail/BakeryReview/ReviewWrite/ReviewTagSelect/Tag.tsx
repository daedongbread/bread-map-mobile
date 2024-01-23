import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixel } from '@/utils';

type Props = {
  isSelected: boolean;
  text: string;
};

export const Tag = ({ isSelected, text }: Props) => {
  return (
    <View style={[styles.toggle, isSelected && styles.selectedToggle]}>
      <Text
        color={isSelected ? theme.color.white : theme.color.gray800}
        presets={['body2', isSelected ? 'bold' : 'regular']}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toggle: {
    backgroundColor: theme.color.gray200,
    paddingVertical: 8,
    paddingHorizontal: resizePixel(16),
    marginRight: resizePixel(10),
    marginBottom: 10,
    borderRadius: 100,
  },
  selectedToggle: {
    backgroundColor: theme.color.primary600,
  },
});
