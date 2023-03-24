import React, { memo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useGetReviews } from '@/apis/profile/useGetReviews';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/core';
import EmptyData from '@shared/Images/emptyData.png';
import { Text } from '@shared/Text';
import { ReviewListItem } from './ReviewListItem';

export function ReviewList({ userId }: { userId: number }) {
  const {
    data: reviewData,
    loading: reviewLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetReviews({ userId: userId });
  const navigation = useNavigation<MainStackScreenProps<keyof MainStackParamList>['navigation']>();
  const [refreshing, setRefreshing] = useState(false);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const getRefreshData = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };
  const onItemClick = (item: any) => {
    navigation.navigate('BakeryReviewDetailStack', {
      screen: 'BakeryReviewDetail',
      params: {
        reviewId: item?.reviewInfo?.id,
      },
    });
  };

  return (
    <>
      {!reviewLoading && (
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReached={loadMore}
          onEndReachedThreshold={0.7}
          data={reviewData?.pages
            ?.map(page => {
              return page.contents;
            })
            .flat()}
          renderItem={data => {
            return <ReviewListItem item={data?.item} onItemClick={onItemClick} />;
          }}
          keyExtractor={item => {
            return item?.reviewInfo?.id;
          }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ReviewListEmptyComponent}
          style={styles.Flatlist}
        />
      )}
    </>
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
    <Text presets={['body2', 'medium']} style={styles.EmptyText}>
      아직 리뷰가 없어요
    </Text>
    <Text presets={['body2', 'medium']} style={styles.EmptyText}>
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
