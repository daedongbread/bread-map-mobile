import React, { useCallback } from 'react';
import { useBlockUser } from '@/apis/auth/useBlockUser';
import { useDeletePost, useGetTopPosts, usePostToggleLike } from '@/apis/community';
import { Post, PostTopic } from '@/apis/community/types';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { CommunityHotPostComponent } from '@/components/Home/CommunityHotPost';
import { useCommunityBottomSheetNavigation } from '@/hooks/Navigation';
import { useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';
import BlockUserIcon from '@shared/Icons/BlockUserIcon.svg';
import DeleteIcon from '@shared/Icons/DeleteIcon.svg';
import EditIcon from '@shared/Icons/EditIcon.svg';
import ReportIcon from '@shared/Icons/ReportIcon.svg';
import { ImageItemBttomSheetButtonType } from '../Modal/ImageItemBottomSheetContainer';

type Navigation = MainStackScreenProps<'CommunityStack'>;

export const CommunityHotPostContainer = () => {
  const navigation = useNavigation<Navigation['navigation']>();
  const { userId: storedUserId } = useAppSelector(selector => selector.auth);

  const { goNavAccuse, goNavBlockUserBottomSheet, goNavDeleteBottomSheet, goNavEdit, goNavSuccessBottomSheet } =
    useCommunityBottomSheetNavigation();

  const { mutateAsync: postToggleLike } = usePostToggleLike();
  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: unLikeReview } = useUnLikeReview();
  const { mutateAsync: postBlockUser } = useBlockUser();
  const { mutateAsync: deletePostApi } = useDeletePost();

  const { posts = [] } = useGetTopPosts();

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
      params: {
        postTopic: 'ALL',
      },
    });
  }, [navigation]);

  const onPressMenu = (post: Post) => {
    if (post.postTopic === 'REVIEW') {
      goNavReviewMenuBottomSheet(post.postId, post.writerInfo.userId);
    } else {
      goNavPostMenuBottomSheet(post);
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
    navigation.navigate('PostDetail', {
      postId,
      postTopic: _postTopic,
    });
  };

  const refresh = () => {
    // refetch data
  };

  const deletePost = async (targetPostId: number, targetPostTopic: PostTopic) => {
    await deletePostApi(
      { postId: targetPostId, postTopic: targetPostTopic },
      {
        onSuccess: () => {
          goNavSuccessBottomSheet({
            content: '요청 주신 게시글 삭제가\n완료되었어요!',
            onConfirmCallback: () => refresh(),
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
          onConfirmCallback: () => refresh(),
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
