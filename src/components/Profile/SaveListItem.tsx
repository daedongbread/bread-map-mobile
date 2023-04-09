import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { resizePixels } from '@/utils';
import { HeartIcon } from '@shared/Icons';
import { Text } from '@shared/Text';
import IcFlag from '../Shared/Icons/IcFlag.svg';
import { FlagColors } from './ProfileComponent';
import { SaveListItemImages } from './SaveListItemImages';

export function SaveListItem({ item, onItemClick }: any) {
  const color =
    item?.flagInfo?.color === 'ORANGE'
      ? FlagColors.ORANGE
      : item?.flagInfo?.color === 'GREEN'
      ? FlagColors.GREEN
      : item?.flagInfo?.color === 'YELLOW'
      ? FlagColors.YELLOW
      : item?.flagInfo?.color === 'CYAN'
      ? FlagColors.CYAN
      : item?.flagInfo?.color === 'BLUE'
      ? FlagColors.BLUE
      : item?.flagInfo?.color === 'SKY'
      ? FlagColors.SKY
      : item?.flagInfo?.color === 'NAVY'
      ? FlagColors.NAVY
      : item?.flagInfo?.color === 'PURPLE'
      ? FlagColors.PURPLE
      : item?.flagInfo?.color === 'RED'
      ? FlagColors.RED
      : FlagColors.PINK;

  return (
    <TouchableOpacity onPress={onItemClick(item)} style={styles.Container}>
      <SaveListItemImages num={item?.flagInfo?.bakeryNum} images={item?.bakeryImageList} />
      <View style={styles.Info}>
        <View style={[styles.IconBackground, { backgroundColor: color }]}>
          {item?.flagInfo?.name !== '가봤어요' ? <HeartIcon width={18} color={color} /> : <IcFlag width={12} />}
        </View>
        <Text style={styles.Text} presets={['caption1', 'bold']}>
          {item.flagInfo?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      width: 153,
      height: 142,
    },
    Image: {
      width: 152,
      height: 116,
    },
    Text: {
      color: 'black',
      marginLeft: 4,
    },
    Info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    IconBackground: {
      width: 16,
      height: 16,
      borderRadius: 99,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);
