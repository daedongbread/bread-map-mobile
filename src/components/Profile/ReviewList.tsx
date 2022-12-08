import React, { memo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import EmptyData from '@shared/Images/emptyData.png';
import { Text } from '../Shared/Text';
import { ReviewListItem } from './ReviewListItem';

export function ReviewList({ userReviewList }: any) {
  return (
    <FlatList
      data={userReviewList}
      renderItem={data => {
        return <ReviewListItem item={data?.item} />;
      }}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ReviewListEmptyComponent}
      style={styles.Flatlist}
    />
  );
}

const ItemSeparatorComponent = memo(() => (
  <View style={styles.SeparatorContainer}>
    <View style={styles.Line} />
  </View>
));

const ReviewListEmptyComponent = memo(() => (
  <View style={styles.EmptyContainer}>
    <FastImage style={styles.EmptyImage} source={EmptyData} />
    <Text presets={['body2', 'regular']} style={styles.EmptyText}>
      아직 리뷰가 없어요
    </Text>
    <Text presets={['body2', 'regular']} style={styles.EmptyText}>
      첫 리뷰를 남겨주세요
    </Text>
  </View>
));

const styles = StyleSheet.create(
  resizePixels({
    SeparatorContainer: {
      height: 41,
      justifyContent: 'center',
    },
    Line: {
      height: 1,
      backgroundColor: theme.color.gray200,
      marginHorizontal: 20,
    },
    EmptyContainer: {
      flex: 1,
      alignItems: 'center',
    },
    Flatlist: {
      paddingTop: 16,
    },
    EmptyImage: {
      width: 97,
      height: 80,
      marginTop: 80,
      marginBottom: 14,
    },
    EmptyText: {
      color: theme.color.gray500,
    },
  })
);

const mockReviewData = [
  {
    name: '루엘드파리1',
    location: '서울 서초구',
    type: '잠봉뵈르',
    rating: '1.0',
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
      {
        url: 'https://source.unsplash.com/collection/2',
      },
      {
        url: 'https://source.unsplash.com/collection/3',
      },
    ],
    content: '항상 남부터미널오면 꼭 방문해서 몇개씩 사갑니다. 너무 맛있어요!!갑니다. 너무 맛있어요!! 맛있어요!!',
  },
  {
    name: '루엘드파리2',
    location: '서울 서초구',
    type: '잠봉뵈르',
    rating: '1.0',
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
    ],
    content: '항상 남부터미널오면 꼭 방문해서 몇개씩 사갑니다. 너무 맛있어요!!갑니다. 너무 맛있어요!! 맛있어요!!',
  },
  {
    name: '루엘드파리3',
    location: '서울 서초구',
    type: '잠봉뵈르',
    rating: '1.0',
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
    ],
    content: '항상 남부터미널오면 꼭 방문해서 몇개씩 사갑니다. 너무 맛있어요!!갑니다. 너무 맛있어요!! 맛있어요!!',
  },
  {
    name: '루엘드파리4',
    location: '서울 서초구',
    type: '잠봉뵈르',
    rating: '1.0',
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
    ],
    content: '항상 남부터미널오면 꼭 방문해서 몇개씩 사갑니다. 너무 맛있어요!!갑니다. 너무 맛있어요!! 맛있어요!!',
  },
  {
    name: '루엘드파리5',
    location: '서울 서초구',
    type: '잠봉뵈르',
    rating: '1.0',
    imageList: [
      {
        url: 'https://source.unsplash.com/collection/1',
      },
    ],
    content: '항상 남부터미널오면 꼭 방문해서 몇개씩 사갑니다. 너무 맛있어요!!갑니다. 너무 맛있어요!! 맛있어요!!',
  },
];
