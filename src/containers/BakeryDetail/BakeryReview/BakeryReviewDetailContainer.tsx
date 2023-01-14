import React from 'react';
import { BakeryReviewDetailComponent } from '@/components/BakeryDetail/BakeryReview';
import { BakeryReviewStackParamList } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const BakeryReviewDetailContainer = () => {
  const route = useRoute<NativeStackScreenProps<BakeryReviewStackParamList, 'BakeryReviewDetail'>['route']>();

  const {
    params: { review, info },
  } = route;

  return <BakeryReviewDetailComponent review={review} info={info} />;
};
