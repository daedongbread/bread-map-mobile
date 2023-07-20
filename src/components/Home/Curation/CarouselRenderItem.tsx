import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { CarouselItemType } from './CurationComponent';
import { PaginationView } from './PaginationView';

type Props = {
  item: CarouselItemType;
  activeIndex: number;
  totalPageSize: number;
  onPressDetail: () => void;
};

export const CarouselRenderItem: React.FC<Props> = ({ item, activeIndex, totalPageSize, onPressDetail }) => {
  const { subtitle, title, source } = item;

  return (
    <TouchableOpacity style={styles.container} onPress={onPressDetail} activeOpacity={1}>
      <ImageBackground source={{ uri: source }} resizeMode="cover" style={styles.imageBackgroundContainer}>
        <View style={styles.imageBackgroundContainer}>
          <View style={styles.textContainer}>
            <Text presets={['body2']} color="white">
              {subtitle}
            </Text>
            <Text presets={['heading2']} color="white">
              {title}
            </Text>
          </View>

          <View style={styles.paginationViewContainer}>
            <PaginationView activeIndex={activeIndex} totalPageSize={totalPageSize} />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
