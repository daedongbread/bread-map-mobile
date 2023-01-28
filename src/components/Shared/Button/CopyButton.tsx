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
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <CopyIcon />
      <Text style={styles.text}>복사</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: theme.color.gray400,
    marginLeft: 2,
  },
});
