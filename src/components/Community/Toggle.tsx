import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '@/styles/theme';
import { Text } from '../Shared/Text';

type Props = {
  title: string;
  isSeleted: boolean;
  onPressToggle: () => void;
};

export const Toggle = ({ title, isSeleted, onPressToggle }: Props) => {
  return (
    <TouchableOpacity style={[styles.container, isSeleted && styles.selected]} onPress={onPressToggle}>
      <Text
        color={isSeleted ? theme.color.primary600 : theme.color.gray900}
        presets={['body2', isSeleted ? 'bold' : 'medium']}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginRight: 8,
    borderColor: theme.color.gray200,
    borderWidth: 1,
    backgroundColor: theme.color.white,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: theme.color.primary600,
    borderWidth: 1,
  },
});
