import React from 'react';
import { useGetReview, useLikeReview, useUnLikeReview } from '@/apis/review';
import { ReviewCommentsDetailComponent } from '@/components/BakeryDetail/BakeryReview/BakeryReviewDetail';
import { BakeryReviewDetailScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/BakeryReviewDetail/Stack';
import { useRoute } from '@react-navigation/native';

type Route = BakeryReviewDetailScreenProps<'ReviewCommentsDetail'>['route'];

export const ReviewCommentsDetailContainer = () => {
  const route = useRoute<Route>();

  const { reviewId } = route.params;
  const { review, refetch: refetchReview } = useGetReview({ reviewId });

  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: unLikeReview } = useUnLikeReview();

  const onPressLikeButton = async (isLiked: boolean) => {
    if (isLiked) {
      await unLikeReview(reviewId);
    } else {
      await likeReview(reviewId);
    }

    refetchReview();
  };

  if (!review) {
    return null;
  }

  return <ReviewCommentsDetailComponent review={review} onPressLikeButton={onPressLikeButton} />;
};
