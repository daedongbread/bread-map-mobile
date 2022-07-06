import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { BakeryReview, resizePixels } from '@/utils';
import Review from './Review';

type ReviewsProps = {
  headerComponent?: React.ReactElement;
  reviews: BakeryReview[];
  onPress: (review: BakeryReview) => void;
};

const Reviews: React.FC<ReviewsProps> = ({ headerComponent, reviews, onPress }) => (
  <FlatList
    ListHeaderComponent={headerComponent}
    ListHeaderComponentStyle={styles.header}
    data={reviews}
    keyExtractor={review => review.menuReviewId.toString()}
    renderItem={({ item }) => <Review review={item} onPress={onPress} />}
  />
);

export { Reviews };

const styles = StyleSheet.create(
  resizePixels({
    header: {
      marginHorizontal: 20,
    },
  })
);
