import React, { useCallback, useEffect, useState } from 'react';
import { useBlockUser } from '@/apis/auth/useBlockUser';
import { useDeletePost, useGetInfinitePosts, usePostToggleLike } from '@/apis/community';
import { Post, PostTopic } from '@/apis/community/types';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { CommunityComponent } from '@/components/Community';
import { useCommunityBottomSheetNavigation } from '@/hooks/Navigation';
import { useAppSelector } from '@/hooks/redux';
import { CommunityStackScreenProps } from '@/pages/MainStack/Community/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import BlockUserIcon from '@shared/Icons/BlockUserIcon.svg';
import DeleteIcon from '@shared/Icons/DeleteIcon.svg';
import EditIcon from '@shared/Icons/EditIcon.svg';
import ReportIcon from '@shared/Icons/ReportIcon.svg';
import { ImageItemBttomSheetButtonType } from '../Modal/ImageItemBottomSheetContainer';

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

  const { goNavAccuse, goNavBlockUserBottomSheet, goNavDeleteBottomSheet, goNavEdit, goNavSuccessBottomSheet } =
    useCommunityBottomSheetNavigation();
  const { userId: storedUserId } = useAppSelector(selector => selector.auth);

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
  const { mutateAsync: postBlockUser } = useBlockUser();
  const { mutateAsync: deletePostApi } = useDeletePost();

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

  const onPressMenu = useCallback((post: Post) => {
    if (post.postTopic === 'REVIEW') {
      goNavReviewMenuBottomSheet(post.postId, post.writerInfo.userId);
    } else {
      goNavPostMenuBottomSheet(post);
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

  const deletePost = async (targetPostId: number, targetPostTopic: PostTopic) => {
    await deletePostApi(
      { postId: targetPostId, postTopic: targetPostTopic },
      {
        onSuccess: () => {
          goNavSuccessBottomSheet({
            content: '요청 주신 게시글 삭제가\n완료되었어요!',
            onConfirmCallback: () => resetPaging(),
          });
        },
      }
    );
  };

  const blockUser = async (targetUserId: number) => {
    await postBlockUser(targetUserId, {
      onSuccess: () => {
        goNavSuccessBottomSheet({
          content: '요청 주신 사용자의 차단이\n완료되었어요!',
          onConfirmCallback: () => resetPaging(),
        });
      },
    });
  };

  const goNavPostMenuBottomSheet = (post: Post) => {
    let buttonList: ImageItemBttomSheetButtonType[] = [];

    // 자신의 게시글일 경우
    if (storedUserId === post.writerInfo.userId) {
      buttonList = [
        {
          image: EditIcon,
          title: '수정하기',
          onPress: () =>
            goNavEdit({
              targetPostId: post.postId,
              targetPostTopic: post.postTopic,
            }),
        },
        {
          image: DeleteIcon,
          title: '삭제하기',
          onPress: () =>
            goNavDeleteBottomSheet({
              onPressLeftButton: () => deletePost(post.postId, post.postTopic),
            }),
        },
      ];
    } else {
      buttonList = [
        {
          image: ReportIcon,
          title: '신고하기',
          onPress: () =>
            goNavAccuse({
              targetPostId: post.postId,
              targetPostTopic: post.postTopic,
            }),
        },
        {
          image: BlockUserIcon,
          title: '이 사용자의 글 보지않기',
          onPress: () =>
            goNavBlockUserBottomSheet({
              onPressRightButton: () => blockUser(post.writerInfo.userId),
            }),
        },
      ];
    }

    navigation.navigate('ImageItemBottomSheet', {
      buttonList,
    });
  };

  const goNavReviewMenuBottomSheet = (targetReviewId: number, targetUserId: number) => {
    const buttonList = [
      {
        image: ReportIcon,
        title: '신고하기',
        onPress: () =>
          goNavAccuse({
            targetPostId: targetReviewId,
            targetPostTopic: 'REVIEW',
          }),
      },
      {
        image: BlockUserIcon,
        title: '이 사용자의 글 보지않기',
        onPress: () =>
          goNavBlockUserBottomSheet({
            onPressRightButton: () => blockUser(targetUserId),
          }),
      },
    ];

    navigation.navigate('ImageItemBottomSheet', {
      buttonList,
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
