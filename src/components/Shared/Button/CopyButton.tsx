import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '@/styles/theme';
import { CopyIcon } from '../Icons';
import { Text } from '../Text';

type Props = {
  onPress: () => void;
};

export const CopyButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>
        <CopyIcon />
        복사
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: theme.color.gray400,
  },
});
