import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CloseIcon } from '@/components/Shared/Icons';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  onPressClose?: () => void;
  isPrevButtonShown?: boolean;
  isCloseButtonShown?: boolean;
}

export const Header = ({ title, onPressClose, isPrevButtonShown = false, isCloseButtonShown = false }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'ReviewWriteStack'>['navigation']>();

  const onPressPrevBtn = () => {
    navigation.pop();
  };

  const onPressCloseBtn = () => {
    if (onPressClose) {
      onPressClose();
    }
  };

  return (
    <View style={styles.headerContainer}>
      {isPrevButtonShown ? (
        <TouchableOpacity onPress={onPressPrevBtn}>
          <PrevIcon />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <Text style={styles.headerText}>{title}</Text>
      {isCloseButtonShown ? (
        <TouchableOpacity onPress={onPressCloseBtn}>
          <CloseIcon />
        </TouchableOpacity>
      ) : (
        <View />
      )}
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
});
