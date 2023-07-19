import React, { useState } from 'react';
import { useGetReview } from '@/apis/review';
import { BakeryReviewDetailComponent } from '@/components/BakeryDetail/BakeryReview/BakeryReviewDetail';
import { useAppSelector } from '@/hooks/redux';
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
  const { userId } = useAppSelector(selector => selector.auth);

  const [comment, setComment] = useState('');

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

  const onPressCommentMenu = (commentId: number, commentOwnerId: number) => {
    let type = 2;

    if (commentOwnerId === userId) {
      type = 0;
    } else if (review.reviewDto.userInfo.userId === userId) {
      type = 2;
    } else {
      type = 1;
    }

    navigation.navigate('CommentMenuBottomSheet', {
      commentId,
      type,
    });
  };

  const onPressCommentSubmit = () => {};

  return (
    <BakeryReviewDetailComponent
      review={review}
      comment={comment}
      setComment={setComment}
      refetch={refetch}
      goNavBakeryDetail={goNavBakeryDetail}
      onPressCommentMenu={onPressCommentMenu}
      onPressCommentSubmit={onPressCommentSubmit}
    />
  );
};
