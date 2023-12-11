import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  style?: ViewStyle;
  text: string;
  isSelected: boolean;
  onPress: () => void;
};

export const SortingButton = ({ style, text, isSelected, onPress }: Props) => {
  return (
    <TouchableOpacity style={{ ...style }} onPress={onPress}>
      <View style={styles.row}>
        <View style={[styles.circle, { backgroundColor: isSelected ? theme.color.primary500 : theme.color.gray400 }]} />

        <SplitColumn width={6} />

        <Text
          presets={isSelected ? ['body2', 'semibold'] : ['body2', 'medium']}
          color={isSelected ? theme.color.primary500 : theme.color.gray400}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
