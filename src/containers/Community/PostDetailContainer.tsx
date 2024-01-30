import { AxiosError } from 'axios';
import React, { useCallback } from 'react';
import { Alert, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useQueryClient } from 'react-query';
import { useBlockUser } from '@/apis/auth/useBlockUser';
import { useDeletePost, useGetInfiniteComments, useGetPost, usePostToggleLike } from '@/apis/community';
import { PostTopic } from '@/apis/community/types';
import { PostDetailComponent } from '@/components/Community/PostDetailComponent';
import { useCommunityBottomSheetNavigation } from '@/hooks/Navigation';
import { useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { isCloseToBottom } from '@/utils/scroll/scroll';
import { useNavigation, useRoute } from '@react-navigation/native';
import BlockUserIcon from '@shared/Icons/BlockUserIcon.svg';
import DeleteIcon from '@shared/Icons/DeleteIcon.svg';
import EditIcon from '@shared/Icons/EditIcon.svg';
import ReportIcon from '@shared/Icons/ReportIcon.svg';
import { ImageItemBttomSheetButtonType } from '../Modal/ImageItemBottomSheetContainer';

type Navigation = MainStackScreenProps<'PostDetail'>['navigation'];
type Route = MainStackScreenProps<'PostDetail'>['route'];

export const PostDetailContainer = () => {
  const navigation = useNavigation<Navigation>();
  const queryClient = useQueryClient();

  const { goNavAccuse, goNavBlockUserBottomSheet, goNavDeleteBottomSheet, goNavEdit, goNavSuccessBottomSheet } =
    useCommunityBottomSheetNavigation();
  const { userId: storedUserId } = useAppSelector(selector => selector.auth);

  const { params } = useRoute<Route>();
  const { postId, postTopic } = params;

  const { mutateAsync: onPressLike } = usePostToggleLike();
  const { mutateAsync: postBlockUser } = useBlockUser();
  const { mutateAsync: deletePostApi } = useDeletePost();

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

  const { post, refetch: refetchPost } = useGetPost({ postTopic, postId, onErrorCb: onError });
  const {
    comments = [],
    hasNextPage,
    fetchNextPage,
    refetch: refetchComments,
  } = useGetInfiniteComments({ postId, postTopic });
  const flatComments = comments && comments.map(comment => comment.contents).flat();

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(event)) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  };

  const refetchAll = () => {
    // 리뷰내용 refetch
    refetchPost();
    // 댓글 refetch
    queryClient.refetchQueries({
      queryKey: ['useGetComments', { postId }],
    });
  };

  const deletePost = async (targetPostId: number, targetPostTopic: PostTopic) => {
    await deletePostApi(
      { postId: targetPostId, postTopic: targetPostTopic },
      {
        onSuccess: () => {
          goNavSuccessBottomSheet({
            content: '요청 주신 게시글 삭제가\n완료되었어요!',
            onConfirmCallback: () => navigation.pop(),
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
          onConfirmCallback: () => navigation.pop(),
        });
      },
    });
  };

  const onPressMenu = useCallback(() => {
    if (!post) {
      return;
    }

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <PostDetailComponent
      post={post}
      comments={flatComments}
      onScrollEndDrag={onScrollEndDrag}
      onPressLike={onPressLike}
      refetchPost={refetchAll}
      refetchComments={refetchComments}
      onPressMenu={onPressMenu}
    />
  );
};
