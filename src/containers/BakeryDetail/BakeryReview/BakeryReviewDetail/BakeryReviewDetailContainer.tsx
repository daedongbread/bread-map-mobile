import { AxiosError } from 'axios';
import React from 'react';
import { Alert, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useQueryClient } from 'react-query';
import { useBlockUser } from '@/apis/auth/useBlockUser';
import { useGetInfiniteComments } from '@/apis/community';
import { useGetReview } from '@/apis/review';
import { BakeryReviewDetailComponent } from '@/components/BakeryDetail/BakeryReview/BakeryReviewDetail';
import { useCommunityBottomSheetNavigation } from '@/hooks/Navigation';
import { BakeryReviewDetailScreenProps } from '@/pages/MainStack/BakeryDetail/Tab/BakeryReview/BakeryReviewDetail/Stack';
import { HomeStackParamList, HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { isCloseToBottom } from '@/utils/scroll/scroll';
import { CompositeScreenProps, useNavigation, useRoute } from '@react-navigation/native';
import BlockUserIcon from '@shared/Icons/BlockUserIcon.svg';
import ReportIcon from '@shared/Icons/ReportIcon.svg';

type Route = BakeryReviewDetailScreenProps<'BakeryReviewDetail'>['route'];
type Navigation = CompositeScreenProps<
  BakeryReviewDetailScreenProps<'BakeryReviewDetail'>,
  HomeStackScreenProps<keyof HomeStackParamList>
>['navigation'];

export const BakeryReviewDetailContainer = () => {
  const route = useRoute<Route>();
  const navigation = useNavigation<Navigation>();
  const queryClient = useQueryClient();

  const { goNavAccuse, goNavBlockUserBottomSheet, goNavSuccessBottomSheet } = useCommunityBottomSheetNavigation();

  const { reviewId } = route.params;

  const { mutateAsync: postBlockUser } = useBlockUser();

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
  const {
    comments = [],
    hasNextPage,
    fetchNextPage,
    refetch: refetchComments,
  } = useGetInfiniteComments({ postId: reviewId, postTopic: 'REVIEW' });
  const flatComments = comments && comments.map(comment => comment.contents).flat();

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(event)) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  };

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

  const blockUser = async (targetUserId: number) => {
    await postBlockUser(targetUserId, {
      onSuccess: () => {
        goNavSuccessBottomSheet({
          content: '요청 주신 사용자의 차단이\n완료되었어요!',
          onConfirmCallback: () => navigation.pop(),
        });
      },
    });
  };

  const onPressMenu = () => {
    const buttonList = [
      {
        image: ReportIcon,
        title: '신고하기',
        onPress: () =>
          goNavAccuse({
            targetPostId: review.reviewDto.reviewInfo.id,
            targetPostTopic: 'REVIEW',
          }),
      },
      {
        image: BlockUserIcon,
        title: '이 사용자의 글 보지않기',
        onPress: () =>
          goNavBlockUserBottomSheet({
            onPressRightButton: () => blockUser(review.reviewDto.userInfo.userId),
          }),
      },
    ];

    navigation.navigate('ImageItemBottomSheet', {
      buttonList,
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
      comments={flatComments}
      onScrollEndDrag={onScrollEndDrag}
      onPressMenu={onPressMenu}
      refetchPage={refetchPage}
      refetchComments={refetchComments}
      goNavBakeryDetail={goNavBakeryDetail}
    />
  );
};
