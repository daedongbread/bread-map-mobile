import React from 'react';
import { useGetReview } from '@/apis/review';
import { BakeryReviewDetailComponent } from '@/components/BakeryDetail/BakeryReview/BakeryReviewDetail';
import { BakeryReviewDetailScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/BakeryReviewDetail/Stack';
import { HomeStackParamList, HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { CompositeScreenProps, useNavigation, useRoute } from '@react-navigation/native';

type Route = BakeryReviewDetailScreenProps<'BakeryReviewDetail'>['route'];
type Navigation = CompositeScreenProps<
  BakeryReviewDetailScreenProps<'BakeryReviewDetail'>,
  HomeStackScreenProps<keyof HomeStackParamList>
>['navigation'];

export const BakeryReviewDetailContainer = () => {
  const route = useRoute<Route>();
  const navigation = useNavigation<Navigation>();

  const { reviewId } = route.params;
  const { review, refetch } = useGetReview({ reviewId });

  if (!review) {
    return null;
  }

  const goNavBakeryDetail = () => {
    navigation.navigate('Bakery', {
      screen: 'BakeryDetailHome',
      params: {
        bakeryId: review.reviewDto.bakeryInfo.bakeryId,
        bakeryName: review.reviewDto.bakeryInfo.bakeryName,
      },
    });
  };

  return <BakeryReviewDetailComponent review={review} refetch={refetch} goNavBakeryDetail={goNavBakeryDetail} />;
};
