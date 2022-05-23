import React, { memo, useState } from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import { resizePixel } from '@/utils';

import defaultThumbnail from '@shared/Images/thumbnail.png';

type Props = {
  source?: ImageProps['source'];
};

export const BakeryThumbnail: React.FC<Props> = memo(({ source = defaultThumbnail }) => {
  const [imgSource, setImgSource] = useState<ImageProps['source']>(source);

  const onError = () => {
    setImgSource(defaultThumbnail);
  };

  return (
    <View style={{ width: resizePixel(108), height: resizePixel(108) }}>
      <Image source={imgSource} onError={onError} style={style.BakeryThumbnailImage} />
    </View>
  );
});

const style = StyleSheet.create({
  BakeryThumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: resizePixel(15),
  },
});
