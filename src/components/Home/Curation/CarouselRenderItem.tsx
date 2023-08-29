import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FeedEntity } from '@/apis/feed/types';
import { resizePixels } from '@/utils';
import { PaginationView } from './PaginationView';

type Props = {
  item: FeedEntity;
  activeIndex: number;
  totalPageSize: number;
  onPressDetail: () => void;
};

export const CarouselRenderItem: React.FC<Props> = ({ item, activeIndex, totalPageSize, onPressDetail }) => {
  const { imageUrl } = item;

  return (
    <TouchableOpacity style={styles.container} onPress={onPressDetail} activeOpacity={1}>
      <ImageBackground source={{ uri: imageUrl }} resizeMode="cover" style={styles.imageBackgroundContainer}>
        <View style={styles.imageBackgroundContainer}>
          <View style={styles.paginationViewContainer}>
            <PaginationView activeIndex={activeIndex} totalPageSize={totalPageSize} />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      width: '100%',
      height: 180,
    },
    imageBackgroundContainer: {
      width: '100%',
      height: '100%',
    },
    textContainer: {
      paddingHorizontal: 30,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    paginationViewContainer: {
      position: 'absolute',
      right: 24,
      bottom: 24,
    },
  })
);
