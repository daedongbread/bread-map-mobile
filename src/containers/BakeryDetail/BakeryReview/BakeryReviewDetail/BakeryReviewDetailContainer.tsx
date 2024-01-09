import { AxiosError } from 'axios';
import React from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from 'react-query';
import { useGetReview } from '@/apis/review';
import { BakeryReviewDetailComponent } from '@/components/BakeryDetail/BakeryReview/BakeryReviewDetail';
import { BakeryReviewDetailScreenProps } from '@/pages/MainStack/BakeryDetail/Tab/BakeryReview/BakeryReviewDetail/Stack';
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
  const queryClient = useQueryClient();

  const { reviewId } = route.params;

  const onError = async (error: AxiosError) => {
    if (error.response && error.response.status === 404) {
      Alert.alert('존재하지 않는 게시글 입니다.', '', [
        {
          text: '확인',
          onPress: () => navigation.pop(),
        },
      ]);
    }
  };

  const { review, refetch: refetchReview } = useGetReview({ reviewId, onErrorCb: onError });

  if (!review) {
    return null;
  }

  const refetchPage = () => {
    // 리뷰내용 refetch
    refetchReview();
    // 댓글 refetch
    queryClient.refetchQueries({
      queryKey: ['useGetComments', { postId: reviewId }],
    });
  };

  const goNavBakeryDetail = () => {
    navigation.navigate('BakeryDetail', {
      screen: 'BakeryDetailHome',
      params: {
        bakeryId: review.reviewDto.bakeryInfo.bakeryId,
        bakeryName: review.reviewDto.bakeryInfo.bakeryName,
      },
    });
  };

  return (
    <BakeryReviewDetailComponent
      review={review}
      refetchReview={refetchReview}
      refetchPage={refetchPage}
      goNavBakeryDetail={goNavBakeryDetail}
    />
  );
};
