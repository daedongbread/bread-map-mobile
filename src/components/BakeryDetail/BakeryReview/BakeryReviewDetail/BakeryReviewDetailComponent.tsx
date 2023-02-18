import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReviewDetailEntity } from '@/apis/bakery/types';
import { Header } from '@/components/Shared/Header';
import { Review } from '@/components/Shared/Reviews';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { resizePixels } from '@/utils';
import { Divider } from '../../Divider';
import { ReviewDetailHeader } from './ReviewDetailHeader';

type Props = {
  review: ReviewDetailEntity;
};

export const BakeryReviewDetailComponent = ({ review }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${review.reviewDto.userInfo.nickName}님의 리뷰`} isPrevButtonShown />
      {/* TO DO : border가 아닌 shadow로 대체 */}
      <ReviewDetailHeader bakery={review.reviewDto.bakeryInfo} />
      <ScrollView>
        <View style={styles.reviewContainer}>
          <Review mode="detail" review={review.reviewDto} isEnd={true} refetchReview={() => null} />
        </View>
        <Divider />
        <View style={styles.commentContainer}>
          <Image
            style={styles.commentEmptyImage}
            source={require('@/components/Shared/Images/emptyData.png')}
            resizeMode={'contain'}
          />
          <SplitRow height={13} />
          <Text style={styles.commentEmptyText}>아직 댓글이 없어요</Text>
          <Text style={styles.commentEmptyText}>첫 댓글을 남겨주세요</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flex: 1,
    },
    reviewContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    commentContainer: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    commentEmptyImage: {
      width: 100,
      height: 80,
    },
    commentEmptyText: {
      color: '#9E9E9E',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
    },
  })
);
