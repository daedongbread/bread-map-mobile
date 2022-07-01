import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlusIcon } from '@/components/Shared/Icons';
import { Text } from '@/components/Shared/Text';

export const AddButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <PlusIcon style={styles.buttonIcon} strokeWidth={'2'} />
      <Text style={styles.buttonText}>메뉴 직접입력하기</Text>
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
    marginRight: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
