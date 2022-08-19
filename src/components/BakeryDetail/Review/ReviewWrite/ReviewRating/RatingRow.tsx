import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { updateSeletedBakeryRating } from '@/slices/review';
import { BakeryToggle } from '../ReviewSelect/BakeryToggle';
import { RatingStars } from './RatingStar';

type Props = {
  bakery: BakeryType;
  onUpdateBakeryRating: ({ id, rating }: updateSeletedBakeryRating) => void;
};

export const RatingRow: React.FC<Props> = ({ bakery, onUpdateBakeryRating }) => {
  const onPressRatingStar = (rating: number) => {
    onUpdateBakeryRating({ id: bakery.id, rating: rating });
  };

  return (
    <View style={styles.ratingRow}>
      <BakeryToggle bakery={bakery} onChangeSeledtedBakery={() => null} />
      <RatingStars rating={bakery.rating} onPressRatingStar={onPressRatingStar} />
    </View>
  );
};

const styles = StyleSheet.create({
  ratingRow: {
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
});
