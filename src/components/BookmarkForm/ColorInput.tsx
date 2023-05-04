import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, View, ViewProps } from 'react-native';
import { theme } from '@/styles/theme';

type Props = {
  color: string;
  isSelected?: boolean;
  onChange: ({ label, value }: { label: string; value: string }) => void;
  style: ViewProps['style'];
};

export const ColorInput: React.FC<Props> = memo(({ color, isSelected = false, onChange, style }) => {
  const bg = { backgroundColor: color };

  const handlePress = useCallback(() => {
    onChange({ label: 'color', value: color });
  }, [color, onChange]);

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.container, isSelected ? styles.select : {}, style]}>
        <View style={[styles.circle, bg]} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.color.gray300,
    borderRadius: 20,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
