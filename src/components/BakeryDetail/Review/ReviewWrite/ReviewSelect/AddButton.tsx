import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlusIcon } from '@/components/Shared/Icons';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  buttonText: string;
  onPress: () => void;
};

export const AddButton: React.FC<Props> = ({ buttonText, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <PlusIcon style={styles.buttonIcon} strokeWidth={'2'} />
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonIcon: {
    color: theme.color.gray800,
    marginRight: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
