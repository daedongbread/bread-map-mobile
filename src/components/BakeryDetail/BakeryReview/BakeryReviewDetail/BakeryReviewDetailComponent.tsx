import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReviewDetailEntity } from '@/apis/bakery/types';
import { Header } from '@/components/Shared/Header';
import { Review } from '@/components/Shared/Reviews';
import { resizePixels } from '@/utils';
import { Divider } from '../../Divider';
import { NoComments } from './NoComments';
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
          <NoComments />
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
      paddingVertical: 40,
    },
  })
);