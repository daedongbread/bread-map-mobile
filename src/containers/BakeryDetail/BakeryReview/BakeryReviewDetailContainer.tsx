import React from 'react';
import { useGetReview } from '@/apis/review';
import { BakeryReviewDetailComponent } from '@/components/BakeryDetail/BakeryReview';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useRoute } from '@react-navigation/native';

export const BakeryReviewDetailContainer = () => {
  const route = useRoute<HomeStackScreenProps<'BakeryReviewDetail'>['route']>();

  const { reviewId } = route.params;
  const { review } = useGetReview({ reviewId });

  if (!review) {
    return null;
  }

  return <BakeryReviewDetailComponent review={review} />;
};
