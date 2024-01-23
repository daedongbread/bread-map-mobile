import React, { useCallback, useEffect, useState } from 'react';
import { useGetInfinitePosts, usePostToggleLike } from '@/apis/community';
import { PostTopic } from '@/apis/community/types';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { CommunityComponent } from '@/components/Community';
import { CommunityStackScreenProps } from '@/pages/MainStack/Community/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = CommunityStackScreenProps<'Community'>['navigation'];
type Route = CommunityStackScreenProps<'Community'>['route'];

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
    title: '빵지순례',
    postTopic: 'BREAD_STORY',
  },
  {
    title: '먹은 빵 자랑',
    postTopic: 'EATEN_BREAD',
  },
  {
    title: '베이킹',
    postTopic: '베이킹',
  },
  {
    title: '빵집리뷰',
    postTopic: 'REVIEW',
  },
  {
    title: '빵 수다',
    postTopic: '빵수다',
  },
  {
    title: '원데이 클래스',
    postTopic: '원데이클래스',
  },
  {
    title: '빵 공구',
    postTopic: '빵공구',
  },
  {
    title: '이벤트',
    postTopic: 'EVENT',
  },
];

export const CommunityContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const postTopicParam = route.params.postTopic || 'ALL';
  const [postTopic, setPostTopic] = useState<PostTopic>(postTopicParam);
  const [isShowWriteMenu, setIsShowWriteMenu] = useState(false);

  useEffect(() => {
    setPostTopic(postTopicParam);
  }, [postTopicParam]);

  // 커뮤니티 페이징 offset
  const [offset, setOffset] = useState({
    postOffset: 0,
    reviewOffset: 0,
  });

  const { mutateAsync: postToggleLike } = usePostToggleLike();
  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: unLikeReview } = useUnLikeReview();

  const {
    posts = [],
    hasNextPage,
    isLoading,
    refetch,
    fetchNextPage,
    remove,
  } = useGetInfinitePosts({ postTopic, offset });
  const flatPosts = posts && posts.map(post => post.contents).flat();

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

  const onPressNotification = () => {
    navigation.navigate('Notification');
  };

  const onPressWrite = (_postTopic: PostTopic) => {
    onPressWriteFloatingButton();

    if (_postTopic === 'REVIEW') {
      navigation.navigate('ReviewWriteStack', {
        screen: 'ReviewTagSelect',
        params: {
          // bakeryId: 763,
          bakeryId: 945,
        },
      });
    } else {
      navigation.navigate('PostWriteStack', {
        screen: 'PostWrite',
        params: {
          postTopic: _postTopic,
        },
      });
    }
  };

  const onPressToggle = (_topic: PostTopic) => {
    remove();
    setPostTopic(_topic);
  };

  const onPressPost = (_postTopic: PostTopic, postId: number) => {
    if (_postTopic === 'REVIEW') {
      goNavReviewDetail(postId);
    } else {
      goNavPostDetail(_postTopic, postId);
    }
  };

  const onPressLike = useCallback(
    async (_postTopic: PostTopic, _postId: number, isLiked: boolean) => {
      if (_postTopic === 'REVIEW') {
        if (isLiked) {
          await unLikeReview(_postId);
        } else {
          await likeReview(_postId);
        }
      } else {
        await postToggleLike(_postId);
      }
    },
    [likeReview, postToggleLike, unLikeReview]
  );

  const onPressMenu = useCallback((_postTopic: PostTopic, postId: number, userId: number) => {
    if (_postTopic === 'REVIEW') {
      goNavReviewMenuBottomSheet(postId, userId);
    } else {
      goNavPostMenuBottomSheet(_postTopic, postId, userId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressWriteFloatingButton = () => {
    setIsShowWriteMenu(prev => !prev);
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
    navigation.navigate('PostDetail', {
      postId,
      postTopic: _postTopic,
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
      isLoading={isLoading}
      menus={menus}
      postTopic={postTopic}
      isShowWriteMenu={isShowWriteMenu}
      onRefresh={onRefresh}
      onPressNotification={onPressNotification}
      onPressWrite={onPressWrite}
      onPressToggle={onPressToggle}
      onPressPost={onPressPost}
      onPressLike={onPressLike}
      onPressMenu={onPressMenu}
      onPressWriteFloatingButton={onPressWriteFloatingButton}
      onScrollEnd={onScrollEnd}
    />
  );
};
