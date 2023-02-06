import React from 'react';
import { ReviewMoreBottomSheetComponent } from '@/components/BakeryDetail/BakeryReview';
import { BakeryReviewStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/Stack';
import { useRoute } from '@react-navigation/native';

export const ReviewMoreBottomSheetContainer = () => {
  const route = useRoute<BakeryReviewStackScreenProps<'ReviewMoreBottomSheet'>['route']>();

  const { reviewId, userId } = route.params;

  return <ReviewMoreBottomSheetComponent reviewId={reviewId} userId={userId} />;
};
