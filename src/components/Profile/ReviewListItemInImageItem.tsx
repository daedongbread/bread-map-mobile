import React from 'react';
import { StyleSheet } from 'react-native';
import { resizePixels } from '@/utils';
import { CustomImage } from '../Shared/CustomImage';

type Props = {
  url: string;
};

export function ReviewListItemInImageItem({ url }: Props) {
  return (
    <CustomImage
      style={styles.Image}
      resizeMode="cover"
      source={{ uri: url }}
      width={styles.Image.width}
      height={styles.Image.height}
    />
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
