import React from 'react';
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

type Props = {
  images: string[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export const Banners = ({ images, onScroll }: Props) => (
  <FlatList
    keyExtractor={(item, index) => index.toString()}
    data={images}
    contentContainerStyle={styles.bannerListContentContainer}
    renderItem={({ item }) => <Image style={styles.banner} source={{ uri: item }} />}
    snapToInterval={width - 40 + 8}
    onScroll={onScroll}
    decelerationRate="fast"
    showsHorizontalScrollIndicator={false}
    horizontal
  />
);

const styles = StyleSheet.create({
  bannerListContentContainer: {
    paddingHorizontal: 20,
  },
  banner: {
    width: width - 40,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
});
