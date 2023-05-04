import React from 'react';
import { ReviewMoreBottomSheetComponent } from '@/components/BakeryDetail/BakeryReview';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useRoute } from '@react-navigation/native';

type Route = MainStackScreenProps<'ReviewMoreBottomSheet'>['route'];

export const ReviewMoreBottomSheetContainer = () => {
  const route = useRoute<Route>();

  const { reviewId, userId } = route.params;

  return <ReviewMoreBottomSheetComponent reviewId={reviewId} userId={userId} />;
};
