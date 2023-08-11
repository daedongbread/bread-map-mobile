import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReviewDetailEntity } from '@/apis/bakery/types';
import { Header } from '@/components/Shared/Header';
import { Review } from '@/components/Shared/Reviews';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { CommentContainer } from '@/containers/Comment';
import { resizePixels } from '@/utils';
import { Divider } from '../../Divider';

type Props = {
  review: ReviewDetailEntity;
  refetch: () => void;
  goNavBakeryDetail: () => void;
};

export const BakeryReviewDetailComponent = ({ review, refetch, goNavBakeryDetail }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
      enableOnAndroid
      enableAutomaticScroll={true}
      extraHeight={12}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={styles.container}>
        <Header title={`${review.reviewDto.userInfo.nickName}님의 리뷰`} isPrevButtonShown />

        <View style={styles.reviewContainer}>
          <Review
            mode="detail"
            review={review.reviewDto}
            isEnd={true}
            onPressBakery={goNavBakeryDetail}
            refetchReview={refetch}
          />
        </View>

        <Divider />

        <CommentContainer postId={review.reviewDto.reviewInfo.id} postTopic="REVIEW" />

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
    scrollContentContainer: {
      flexGrow: 1,
    },
    mainContainer: {
      flex: 1,
    },
    reviewContainer: {
      paddingHorizontal: 20,
    },
  })
);
