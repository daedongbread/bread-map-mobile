import React, { useCallback, useEffect, useState } from 'react';
import { useGetInfinitePosts, usePostToggleLike } from '@/apis/community';
import { PostTopic } from '@/apis/community/types';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { CommunityComponent } from '@/components/Community';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { CommunityStackScreenProps } from '@/pages/MainStack/Community/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = CommunityStackScreenProps<'Community'>['navigation'];

export type ToggleMenu = {
  title: string;
  postTopic: PostTopic;
};

const menus: ToggleMenu[] = [
  {
    title: '전체',
    postTopic: 'ALL',
  },
  {
    title: '빵이야기',
    postTopic: 'BREAD_STORY',
  },
  {
    title: '먹은 빵 자랑',
    postTopic: 'EATEN_BREAD',
  },
  {
    title: '리뷰',
    postTopic: 'REVIEW',
  },
  {
    title: '이벤트',
    postTopic: 'EVENT',
  },
  {
    title: '빵터지는 이야기',
    postTopic: 'FREE_TALK',
  },
];

export const CommunityContainer = () => {
  const navigation = useNavigation<Navigation>();

  const [postTopic, setPostTopic] = useState<PostTopic>('ALL');

  // 커뮤니티 페이징 offset
  const [offset, setOffset] = useState({
    postOffset: 0,
    reviewOffset: 0,
  });

  const { mutateAsync: postToggleLike } = usePostToggleLike();
  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: unLikeReview } = useUnLikeReview();

  const { posts = [], hasNextPage, refetch, fetchNextPage, remove } = useGetInfinitePosts({ postTopic, offset });
  const flatPosts = posts && posts.map(post => post.contents).flat();

  useDidMountEffect(() => {
    resetPaging();
  }, [postTopic]);

  useEffect(() => {
    const lastPostObject = posts[posts.length - 1];

    if (lastPostObject) {
      setOffset({
        postOffset: lastPostObject.postOffset,
        reviewOffset: lastPostObject.reviewOffset,
      });
    }
  }, [posts]);

  useEffect(() => {
    return () => {
      remove();
    };
  }, [remove]);

  const resetPaging = useCallback(() => {
    remove();
    refetch();
  }, [refetch, remove]);

  const onRefresh = useCallback(() => {
    resetPaging();
  }, [resetPaging]);

  const onPressPrev = () => {
    navigation.goBack();
  };

  const onPressWrite = () => {
    navigation.navigate('PostWrite');
  };

  const onPressToggle = (_topic: PostTopic) => {
    setPostTopic(_topic);
  };

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

  const goNavPostMenuBottomSheet = (_postTopic: PostTopic, postId: number, userId: number) => {
    navigation.navigate('PostMenuBottomSheet', {
      postId,
      userId,
      postTopic: _postTopic,
    });
  };

  const goNavReviewMenuBottomSheet = (postId: number, userId: number) => {
    navigation.navigate('ReviewMoreBottomSheet', {
      reviewId: postId,
      userId,
    });
  };

  const onScrollEnd = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <CommunityComponent
      posts={flatPosts}
      menus={menus}
      postTopic={postTopic}
      onRefresh={onRefresh}
      onPressPrev={onPressPrev}
      onPressWrite={onPressWrite}
      onPressToggle={onPressToggle}
      onPressPost={onPressPost}
      onPressLike={onPressLike}
      onPressMenu={onPressMenu}
      onScrollEnd={onScrollEnd}
    />
  );
};
