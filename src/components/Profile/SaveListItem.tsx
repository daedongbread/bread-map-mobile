import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { HeartIcon } from '../Shared/Icons';
import IcFlag from '../Shared/Icons/IcFlag.svg';
import { Text } from '../Shared/Text';
import { SaveListItemImages } from './SaveListItemImages';

export function SaveListItem({ item }: any) {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const onItemClick = () => {
    navigation.push('ProfileStack', {
      screen: 'ListDetail',
    });
  };
  return (
    <TouchableOpacity onPress={onItemClick} style={styles.Container}>
      <SaveListItemImages num={item?.flagImageList.length} images={item?.flagImageList} />
      <View style={styles.Info}>
        <View style={[styles.IconBackground, { backgroundColor: 'pink' }]}>
          {item?.name === '가고싶어요' ? <HeartIcon width={24} /> : <IcFlag width={10} />}
        </View>
        <Text style={styles.Text} presets={['caption1', 'bold']}>
          {item.name}
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
