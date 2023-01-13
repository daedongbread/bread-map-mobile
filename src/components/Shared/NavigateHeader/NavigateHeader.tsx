import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CloseIcon } from '@/components/Shared/Icons';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';

interface Props {
  title: string;
  onPressCloseBtn?: () => void;
  onPressPrevBtn: () => void;
}

export const NavigateHeader = ({ title, onPressPrevBtn, onPressCloseBtn }: Props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPressPrevBtn}>
        <PrevIcon />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.rightButtonContainer}>
        {onPressCloseBtn && (
          <TouchableOpacity onPress={onPressCloseBtn}>
            <CloseIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 19.5,
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  rightButtonContainer: {
    width: 24,
    height: 24,
  },
});
