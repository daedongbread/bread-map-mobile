import React from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FeedEntity } from '@/apis/feed/types';
import { CustomImage } from '@/components/Shared/CustomImage';

const { width } = Dimensions.get('window');

type Props = {
  feeds: FeedEntity[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onPressBanner: (feedId: number) => void;
};

export const Banners = React.memo(({ feeds, onScroll, onPressBanner }: Props) => (
  <FlatList
    keyExtractor={(item, index) => index.toString()}
    data={feeds}
    contentContainerStyle={styles.bannerListContentContainer}
    renderItem={({ item }) => (
      <Pressable onPress={() => onPressBanner(item.feedId)}>
        <CustomImage
          resizeMode="cover"
          style={styles.banner}
          source={{ uri: item.imageUrl }}
          width={320}
          height={100}
          resizedWidth={320}
          resizedHeight={100}
          isResizable
        />
      </Pressable>
    )}
    snapToInterval={width - 40 + 8}
    onScroll={onScroll}
    decelerationRate="fast"
    showsHorizontalScrollIndicator={false}
    horizontal
  />
));

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
