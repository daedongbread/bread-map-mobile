import React, { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useRoute } from '@react-navigation/native';
import { Text } from '../Shared/Text';
import { FollowDetailItem } from './FollowDetailItem';
import { Header } from './Header';

export function FollowDetailComponent() {
  const {
    params: { index },
  } = useRoute<RootRouteProps<'FollowDetail'>>();

  return (
    <>
      <Header type="DETAIL" title={index === 0 ? '팔로잉' : '팔로워'} />
      <FlatList
        contentContainerStyle={styles.Flatlist}
        data={MockData}
        renderItem={FollowDetailItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const ItemSeparatorComponent = memo(() => <View style={styles.SeparatorContainer} />);

const ListEmptyComponent = memo(() => (
  <View style={styles.EmptyContainer}>
    <Text>ListEmptyComponent</Text>
  </View>
));

const styles = StyleSheet.create(
  resizePixels({
    SeparatorContainer: {
      height: 1,
      backgroundColor: theme.color.gray200,
      marginVertical: 12,
    },
    EmptyContainer: {
      backgroundColor: 'pink',
      flex: 1,
    },
    Flatlist: {
      paddingTop: 32,

      marginHorizontal: 20,
    },
  })
);

const MockData = [
  {
    image: 'https://source.unsplash.com/collection/1',
    name: '빵으로살찐자',
    reviewCount: 80,
    followerCount: 150,
    isFollowing: true,
  },
  {
    image: 'https://source.unsplash.com/collection/2',
    name: '내사랑도넛',
    reviewCount: 64,
    followerCount: 124,
    isFollowing: false,
  },
  {
    image: 'https://source.unsplash.com/collection/3',
    name: '도넛을찾아서',
    reviewCount: 80,
    followerCount: 150,
    isFollowing: true,
  },
  {
    image: 'https://source.unsplash.com/collection/1',
    name: '빵으로살찐자',
    reviewCount: 80,
    followerCount: 150,
    isFollowing: true,
  },
  {
    image: 'https://source.unsplash.com/collection/2',
    name: '내사랑도넛',
    reviewCount: 64,
    followerCount: 124,
    isFollowing: false,
  },
  {
    image: 'https://source.unsplash.com/collection/3',
    name: '도넛을찾아서',
    reviewCount: 80,
    followerCount: 150,
    isFollowing: true,
  },
  {
    image: 'https://source.unsplash.com/collection/1',
    name: '빵으로살찐자',
    reviewCount: 80,
    followerCount: 150,
    isFollowing: true,
  },
  {
    image: 'https://source.unsplash.com/collection/2',
    name: '내사랑도넛',
    reviewCount: 64,
    followerCount: 124,
    isFollowing: false,
  },
  {
    image: 'https://source.unsplash.com/collection/3',
    name: '도넛을찾아서',
    reviewCount: 80,
    followerCount: 150,
    isFollowing: true,
  },
  {
    image: 'https://source.unsplash.com/collection/1',
    name: '빵으로살찐자',
    reviewCount: 80,
    followerCount: 150,
    isFollowing: true,
  },
  {
    image: 'https://source.unsplash.com/collection/2',
    name: '내사랑도넛',
    reviewCount: 64,
    followerCount: 124,
    isFollowing: false,
  },
  {
    image: 'https://source.unsplash.com/collection/3',
    name: '도넛을찾아서',
    reviewCount: 80,
    followerCount: 150,
    isFollowing: true,
  },
];
