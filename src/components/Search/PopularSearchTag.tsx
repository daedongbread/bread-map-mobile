import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  name: string;
  onPress: () => void;
};

export const PopularSearchTag = ({ name, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.tag} activeOpacity={0.7} onPress={onPress}>
      <Text presets={['body2', 'medium']} color={theme.color.gray700}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.gray300,
  },
});
