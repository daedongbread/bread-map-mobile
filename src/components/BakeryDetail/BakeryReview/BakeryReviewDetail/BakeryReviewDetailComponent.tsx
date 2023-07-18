import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReviewDetailEntity } from '@/apis/bakery/types';
import { Comments } from '@/components/Community/Comments/Comments';
import { Input } from '@/components/Community/Comments/Input';
import { Header } from '@/components/Shared/Header';
import { Review } from '@/components/Shared/Reviews';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { resizePixels } from '@/utils';
import { Divider } from '../../Divider';
import { ReviewDetailHeader } from './ReviewDetailHeader';

type Props = {
  review: ReviewDetailEntity;
  refetch: () => void;
  goNavBakeryDetail: () => void;
};

export const BakeryReviewDetailComponent = ({ review, refetch, goNavBakeryDetail }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView style={styles.container} enableOnAndroid enableAutomaticScroll={true} extraHeight={12}>
      <SafeAreaView style={styles.container}>
        <Header title={`${review.reviewDto.userInfo.nickName}님의 리뷰`} isPrevButtonShown />

        <TouchableWithoutFeedback onPress={goNavBakeryDetail}>
          <View>
            <ReviewDetailHeader bakery={review.reviewDto.bakeryInfo} />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.reviewContainer}>
          <Review mode="detail" review={review.reviewDto} isEnd={true} refetchReview={refetch} />
        </View>

        <Divider />

        <View style={styles.commentContainer}>
          {/* <NoComments /> */}
          <Comments />
        </View>

        <Input />

        {insets.bottom === 0 && <SplitRow height={12} />}
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
      paddingVertical: 10,
    },
  })
);
