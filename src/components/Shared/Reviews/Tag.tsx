import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  text: string;
};

export const Tag = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <Text color={theme.color.primary600} presets={['caption2', 'medium']}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: theme.color.primary100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
});
