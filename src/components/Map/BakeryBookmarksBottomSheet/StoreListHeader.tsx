import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { theme } from '@/styles/theme';

import { resizePixels } from '@/utils';

import IcListPlus from '@shared/Icons/IcListPlus.svg';
import { Text } from '@shared/Text';

type Props = {
  onPress: () => void;
};

export const StoreListHeader: React.FC<Props> = React.memo(({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={[styles.plusIconWrapper, styles.iconWrapper]}>
          <IcListPlus />
        </View>
        <Text presets={['body1', 'medium']} style={styles.hintText}>
          새 리스트
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create(
  resizePixels({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
    },
    iconWrapper: {
      marginRight: 12,
    },
    plusIconWrapper: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    hintText: {
      color: theme.color.gray600,
    },
  })
);
