import React from 'react';
import { useGetReview } from '@/apis/review';
import { BakeryReviewDetailComponent } from '@/components/BakeryDetail/BakeryReview/BakeryReviewDetail';
import { BakeryReviewDetailScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/BakeryReviewDetail/Stack';
import { useRoute } from '@react-navigation/native';

type Route = BakeryReviewDetailScreenProps<'BakeryReviewDetail'>['route'];

export const BakeryReviewDetailContainer = () => {
  const route = useRoute<Route>();

  const { reviewId } = route.params;
  const { review, refetch } = useGetReview({ reviewId });

  if (!review) {
    return null;
  }

  return <BakeryReviewDetailComponent review={review} refetch={refetch} />;
};
