import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CloseIcon } from '@/components/Shared/Icons';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../Text';

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
      <View style={[styles.prevButton, styles.icon]}>
        {isPrevButtonShown && (
          <TouchableOpacity onPress={onPressPrevBtn}>
            <PrevIcon />
          </TouchableOpacity>
        )}
      </View>
      <Text presets={['subhead', 'bold']} style={styles.headerText} numberOfLines={1} ellipsizeMode={'tail'}>
        {title}
      </Text>
      <View style={[styles.closeButton, styles.icon]}>
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
    marginBottom: 12,
  },
  prevButton: {
    width: 24,
    height: 24,
  },
  closeButton: {
    width: 24,
    height: 24,
  },
  icon: {
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: theme.color.gray900,
  },
});
