import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CloseIcon } from '@/components/Shared/Icons';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  onPressPrev?: () => void;
  onPressClose?: () => void;
  isPrevButtonShown?: boolean;
  isCloseButtonShown?: boolean;
}

export const Header = ({
  title,
  onPressPrev,
  onPressClose,
  isPrevButtonShown = false,
  isCloseButtonShown = false,
}: Props) => {
  const navigation = useNavigation();

  const onPressPrevBtn = () => {
    if (onPressPrev) {
      onPressPrev();
      return;
    }

    navigation.goBack();
  };

  const onPressCloseBtn = () => {
    if (onPressClose) {
      onPressClose();
      return;
    }

    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.icon}>
        {isPrevButtonShown && (
          <TouchableOpacity onPress={onPressPrevBtn}>
            <PrevIcon />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.icon}>
        {isCloseButtonShown && (
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 19.5,
    paddingVertical: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
  headerText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
});
