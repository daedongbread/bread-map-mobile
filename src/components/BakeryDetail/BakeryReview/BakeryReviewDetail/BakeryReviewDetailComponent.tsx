import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
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
  refetchReview: () => void;
  refetchPage: () => void;
  goNavBakeryDetail: () => void;
};

export const BakeryReviewDetailComponent = ({ review, refetchReview, refetchPage, goNavBakeryDetail }: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
      enableOnAndroid
      enableAutomaticScroll={true}
      extraHeight={12}
      keyboardShouldPersistTaps="handled"
      scrollIndicatorInsets={{ right: 1 }}
      refreshControl={<RefreshControl progressViewOffset={top} refreshing={false} onRefresh={refetchPage} />}
    >
      <SafeAreaView style={styles.container}>
        <Header title={`${review.reviewDto.userInfo.nickName}님의 리뷰`} isPrevButtonShown />

        <View style={styles.reviewContainer}>
          <Review
            mode="detail"
            review={review.reviewDto}
            isEnd={true}
            onPressBakery={goNavBakeryDetail}
            refetchReview={refetchReview}
          />
        </View>

        <Divider />

        <CommentContainer postId={review.reviewDto.reviewInfo.id} postTopic="REVIEW" />

        {bottom === 0 && <SplitRow height={12} />}
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
