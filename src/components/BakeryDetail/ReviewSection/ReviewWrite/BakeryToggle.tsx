import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

interface Props {
  bakeryName: string;
}

export const BakeryToggle = ({ bakeryName }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.bakeryNameText}>{bakeryName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.primary500,
    marginRight: 8,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  bakeryNameText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});
