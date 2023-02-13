import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { BakeryReviewEntity, ReviewEntity } from '@/apis/bakery/types';
import { EmptyReviews } from '@/components/BakeryDetail/BakeryReview/EmptyReviews';
import { resizePixels } from '@/utils';
import Review from './Review';

type ReviewsProps = {
  reviews: ReviewEntity;
  headerComponent?: React.ReactElement;
  onPress: (review: BakeryReviewEntity) => void;
};

const Reviews: React.FC<ReviewsProps> = ({ headerComponent, reviews, onPress }) => {
  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      contentContainerStyle={styles.container}
      data={reviews.contents}
      ListEmptyComponent={<EmptyReviews />}
      keyExtractor={review => review.reviewInfo.id.toString()}
      renderItem={({ item, index }) => <Review review={item} onPress={onPress} isEnd={reviews.length === index + 1} />}
    />
  );
};

export { Reviews };

const styles = StyleSheet.create(
  resizePixels({
    container: {
      paddingHorizontal: 20,
    },
  })
);
