import React from 'react';
import { useGetReview } from '@/apis/review';
import { BakeryReviewDetailComponent } from '@/components/BakeryDetail/BakeryReview';
import { BakeryReviewStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/Stack';
import { useRoute } from '@react-navigation/native';

export const BakeryReviewDetailContainer = () => {
  const route = useRoute<BakeryReviewStackScreenProps<'BakeryReviewDetail'>['route']>();

  const { reviewId } = route.params;
  const { review } = useGetReview({ reviewId });

  if (!review) {
    return null;
  }

  return <BakeryReviewDetailComponent review={review} />;
};
