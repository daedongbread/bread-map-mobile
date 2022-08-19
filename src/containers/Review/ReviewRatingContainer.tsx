import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ReviewRating } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewRating';
import { RootState } from '@/slices';
import { updateSeletedBakeryRating } from '@/slices/review';

export const ReviewRatingContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { selectedBakerys } = useSelector((state: RootState) => state.review);

  const onUpdateBakeryRating = ({ id, rating }: updateSeletedBakeryRating) => {
    dispatch(updateSeletedBakeryRating({ id, rating }));
  };

  return <ReviewRating selectedBakery={selectedBakerys} onUpdateBakeryRating={onUpdateBakeryRating} />;
};
