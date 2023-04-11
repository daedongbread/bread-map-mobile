import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { resizePixels } from '@/utils';

type Props = {
  url: string;
};

export function ReviewListItemInImageItem({ url }: Props) {
  return (
    <TouchableOpacity activeOpacity={1}>
      <FastImage style={styles.Image} source={{ uri: url }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Image: {
      width: 140,
      height: 140,
      borderRadius: 8,
      marginRight: 8,
    },
  })
);
