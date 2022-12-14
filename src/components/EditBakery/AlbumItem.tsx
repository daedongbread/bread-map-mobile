import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { resizePixels } from '@/utils';

type Props = {
  item: any;
};

export const AlbumItem =
  (setCurLocationUrl: any) =>
  ({ item }: Props) => {
    const onItemClick = () => {
      setCurLocationUrl(item?.node?.image?.uri);
    };

    return (
      <TouchableOpacity onPress={onItemClick} style={styles.Container}>
        <FastImage style={styles.Image} resizeMode="stretch" source={{ uri: item?.node?.image?.uri }} />
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      width: '33.3%',
    },
    Image: {
      height: 120,
    },
  })
);
