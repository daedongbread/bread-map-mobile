import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { Button } from '@/components/Shared/Button/Button';
import Review from '@/components/Shared/Reviews/Review';
import { Text } from '@/components/Shared/Text';
import { resizePixels } from '@/utils';
import { EmptyReviews } from '../BakeryReview';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Props = {
  reviews: BakeryReviewEntity[];
  briefReviews: BakeryReviewEntity[];
  onPress: (review: BakeryReviewEntity) => void;
  onPressAddBtn: () => void;
  onPressMoreButton: () => void;
};

export const BakeryReviewBriefListComponent = ({
  reviews,
  briefReviews,
  onPress,
  onPressAddBtn,
  onPressMoreButton,
}: Props) => {
  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.header}>
        <TabHeader
          title={'리뷰'}
          totalCount={reviews?.length || 0}
          addBtnText={'리뷰 작성'}
          onPressAddBtn={onPressAddBtn}
        />
        {briefReviews.length === 0 && <EmptyReviews />}
        {briefReviews.map((review, idx) => (
          <Review review={review} onPress={onPress} key={idx} isEnd={briefReviews.length - 1 === idx} />
        ))}
      </View>

      <Button
        size="large"
        onPress={onPressMoreButton}
        appearance="terdary"
        style={{ marginHorizontal: 20, marginVertical: 32 }}
      >
        <Text style={styles.footerButtonText}>전체리뷰보기</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      marginTop: 24,
      backgroundColor: 'white',
    },

    footerButtonText: {
      fontSize: 14,
      fontWeight: '700',
    },
    header: {
      paddingHorizontal: 20,
    },
  })
);
