import React, { useCallback } from 'react';
import { useBlockUser } from '@/apis/auth/useBlockUser';
import { useDeletePost, useGetTopPosts, usePostToggleLike } from '@/apis/community';
import { Post, PostTopic, ReportType } from '@/apis/community/types';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { CommunityHotPostComponent } from '@/components/Home/CommunityHotPost';
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

  const goNavEdit = (targetPostId: number, targetPostTopic: PostTopic) => {
    navigation.navigate('PostWriteStack', {
      screen: 'PostWrite',
      params: {
        postId: targetPostId,
        postTopic: targetPostTopic,
      },
    });
  };

  const refresh = () => {};

  const deletePost = async (targetPostId: number, targetPostTopic: PostTopic) => {
    await deletePostApi(
      { postId: targetPostId, postTopic: targetPostTopic },
      {
        onSuccess: () => {
          navigation.navigate('SuccessBottomSheet', {
            content: '요청 주신 게시글 삭제가\n완료되었어요!',
            onPressConfirmButton: () => refresh(),
          });
        },
      }
    );
  };

  const goNavDeleteBottomSheet = (targetPostId: number, targetPostTopic: PostTopic) => {
    navigation.navigate('QuestionBottomSheet', {
      title: '정말 글을 삭제할까요?',
      subTitle: '삭제한 글은 되돌릴 수 없으니\n신중하게 생각해주세요!',
      leftButtonText: '삭제',
      rightButtonText: '취소',
      onPressLeftButton: () => deletePost(targetPostId, targetPostTopic),
    });
  };

  const goNavAccuse = (targetPostId: number, targetPostTopic: ReportType) => {
    navigation.navigate('ModalStack', {
      screen: 'AccuseComment',
      params: {
        type: targetPostTopic,
        targetId: targetPostId,
      },
    });
  };

  const blockUser = async (targetUserId: number) => {
    await postBlockUser(targetUserId, {
      onSuccess: () => {
        navigation.navigate('SuccessBottomSheet', {
          content: '요청 주신 사용자의 차단이\n완료되었어요!',
          onPressConfirmButton: () => refresh(),
        });
      },
    });
  };

  const goNavBlockUserBottomSheet = (targetUserId: number) => {
    navigation.navigate('QuestionBottomSheet', {
      title: '이 사용자를 차단하시겠어요?',
      subTitle: '더이상 사용자의 게시물을 볼 수 없으며,\n상대방에게 회원님의 차단 정보는 알리지 않습니다.',
      leftButtonText: '아니오',
      rightButtonText: '네',
      onPressRightButton: () => blockUser(targetUserId),
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
          onPress: () => goNavEdit(post.postId, post.postTopic),
        },
        {
          image: DeleteIcon,
          title: '삭제하기',
          onPress: () => goNavDeleteBottomSheet(post.postId, post.postTopic),
        },
      ];
    } else {
      buttonList = [
        {
          image: ReportIcon,
          title: '신고하기',
          onPress: () => goNavAccuse(post.postId, post.postTopic),
        },
        {
          image: BlockUserIcon,
          title: '이 사용자의 글 보지않기',
          onPress: () => goNavBlockUserBottomSheet(post.writerInfo.userId),
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
        onPress: () => goNavAccuse(targetReviewId, 'REVIEW'),
      },
      {
        image: BlockUserIcon,
        title: '이 사용자의 글 보지않기',
        onPress: () => goNavBlockUserBottomSheet(targetUserId),
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
