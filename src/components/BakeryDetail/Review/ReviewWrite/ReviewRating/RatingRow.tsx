import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RatedBread, UpdateSeletedBreadRating } from '@/slices/reviewWrite';
import { BreadToggle } from '../ReviewSelect/BreadToggle';
import { RatingStars } from './RatingStar';

type Props = {
  bread: RatedBread;
  onUpdateBreadRating: ({ id, rating }: UpdateSeletedBreadRating) => void;
};

export const RatingRow: React.FC<Props> = ({ bread, onUpdateBreadRating }) => {
  const onPressRatingStar = (rating: number) => {
    onUpdateBreadRating({ id: bread.id, rating });
  };

  return (
    <View style={styles.ratingRow}>
      <BreadToggle bread={bread} />
      <RatingStars rating={bread.rating} onPressRatingStar={onPressRatingStar} />
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
