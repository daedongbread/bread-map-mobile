import React, { memo, useState } from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { resizePixel } from '@/utils';

import defaultThumbnail from '@shared/Images/thumbnail.png';
import { Text } from '@shared/Text';

type Props = {
  source?: ImageProps['source'];
  isDefaultImage?: boolean;
};

export const BakeryThumbnail: React.FC<Props> = memo(({ source = defaultThumbnail, isDefaultImage = false }) => {
  const [imgSource, setImgSource] = useState<ImageProps['source']>(source);

  const onError = () => {
    setImgSource(defaultThumbnail);
  };

  return (
    <View style={styles.wrapper}>
      <Image source={imgSource} onError={onError} style={styles.image} />
      {isDefaultImage ? (
        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} style={styles.dimWrapper}>
          <Text color={'white'}>이미지 준비중</Text>
        </LinearGradient>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: resizePixel(108),
    height: resizePixel(108),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: resizePixel(15),
  },
  dimWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
