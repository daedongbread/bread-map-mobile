import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { EmptyReviews } from '@/components/BakeryDetail/BakeryReview/EmptyReviews';
import { resizePixels } from '@/utils';
import Review from './Review';

type ReviewsProps = {
  headerComponent?: React.ReactElement;
  reviews: BakeryReviewEntity[];
  onPress: (review: BakeryReviewEntity) => void;
};

const Reviews: React.FC<ReviewsProps> = ({ headerComponent, reviews, onPress }) => (
  <FlatList
    ListHeaderComponent={headerComponent}
    contentContainerStyle={styles.contain}
    data={reviews}
    ListEmptyComponent={<EmptyReviews />}
    keyExtractor={review => review.id.toString()}
    renderItem={({ item, index }) => <Review review={item} onPress={onPress} isEnd={reviews.length === index + 1} />}
  />
);

export { Reviews };

const styles = StyleSheet.create(
  resizePixels({
    contain: {
      paddingHorizontal: 20,
    },
  })
);
