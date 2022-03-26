import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { bindHook, resizePixel } from '@/utils';
import { useBakeryThumbnail } from './useBakeryThumbnail';

const BakeryThumbnail = bindHook(useBakeryThumbnail, ({ source, onError }) => (
  <View style={{ width: resizePixel(108), height: resizePixel(108) }}>
    <Image source={source} onError={onError} style={style.BakeryThumbnailImage} />
  </View>
));

export { BakeryThumbnail };

const style = StyleSheet.create({
  BakeryThumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: resizePixel(15),
  },
});
