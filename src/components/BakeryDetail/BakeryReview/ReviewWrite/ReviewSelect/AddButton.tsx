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
      <PlusIcon style={styles.icon} strokeWidth={'2'} fill={theme.color.gray800} />
      <Text presets={['body2', 'bold']} style={styles.text}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
    alignItems: 'center',
  },
  text: {
    color: theme.color.gray800,
  },
});
