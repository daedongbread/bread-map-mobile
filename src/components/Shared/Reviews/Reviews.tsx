import React from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BakeryReview } from '@/utils';
import Review from './Review';

type ReviewsProps = {
  reviews: BakeryReview[];
  onPress: (review: BakeryReview) => void;
};

const Reviews: React.FC<ReviewsProps> = ({ reviews, onPress }) => (
  <FlatList
    data={reviews}
    keyExtractor={review => review.menuReviewId.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Review review={item} />
      </TouchableOpacity>
    )}
  />
);

export { Reviews };
