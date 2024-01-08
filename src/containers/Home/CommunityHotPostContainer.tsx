import React, { useCallback } from 'react';
import { useGetTopPosts, usePostToggleLike } from '@/apis/community';
import { PostTopic } from '@/apis/community/types';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { CommunityHotPostComponent } from '@/components/Home/CommunityHotPost';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'CommunityStack'>;

export const CommunityHotPostContainer = () => {
  const navigation = useNavigation<Navigation['navigation']>();

  const { posts = [] } = useGetTopPosts();

  const { mutateAsync: postToggleLike } = usePostToggleLike();
  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: unLikeReview } = useUnLikeReview();

  const onPressPost = (_postTopic: PostTopic, postId: number) => {
    if (_postTopic === 'REVIEW') {
      goNavReviewDetail(postId);
    } else {
      goNavPostDetail(_postTopic, postId);
    }
  };

  const onPressLike = async (_postTopic: PostTopic, _postId: number, isLiked: boolean) => {
    if (_postTopic === 'REVIEW') {
      if (isLiked) {
        await unLikeReview(_postId);
      } else {
        await likeReview(_postId);
      }
    } else {
      await postToggleLike(_postId);
    }
  };

  const onPressMore = useCallback(() => {
    navigation.navigate('CommunityStack', {
      screen: 'Community',
    });
  }, [navigation]);

  const onPressMenu = (_postTopic: PostTopic, postId: number, userId: number) => {
    if (_postTopic === 'REVIEW') {
      goNavReviewMenuBottomSheet(postId, userId);
    } else {
      goNavPostMenuBottomSheet(_postTopic, postId, userId);
    }
  };

  const goNavReviewDetail = (reviewId: number) => {
    navigation.navigate('BakeryReviewDetailStack', {
      screen: 'BakeryReviewDetail',
      params: {
        reviewId,
      },
    });
  };

  const goNavPostDetail = (_postTopic: PostTopic, postId: number) => {
    navigation.navigate('CommunityStack', {
      screen: 'PostDetail',
      params: {
        postId,
        postTopic: _postTopic,
      },
    });
  };

  const goNavPostMenuBottomSheet = (postTopic: PostTopic, postId: number, userId: number) => {
    navigation.navigate('PostMenuBottomSheet', {
      postId,
      postTopic,
      userId,
    });
  };

  const goNavReviewMenuBottomSheet = (postId: number, userId: number) => {
    navigation.navigate('ReviewMoreBottomSheet', {
      reviewId: postId,
      userId,
    });
  };

  return (
    <CommunityHotPostComponent
      posts={posts}
      onPressPost={onPressPost}
      onPressLike={onPressLike}
      onPressMore={onPressMore}
      onPressMenu={onPressMenu}
    />
  );
};
