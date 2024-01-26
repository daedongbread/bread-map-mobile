import { AxiosError } from 'axios';
import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from 'react-query';
import { useGetPost, usePostToggleLike } from '@/apis/community';
import { PostDetailComponent } from '@/components/Community/PostDetailComponent';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'PostDetail'>['navigation'];
type Route = MainStackScreenProps<'PostDetail'>['route'];

export const PostDetailContainer = () => {
  const navigation = useNavigation<Navigation>();
  const queryClient = useQueryClient();

  const { params } = useRoute<Route>();
  const { postId, postTopic } = params;

  const { mutateAsync: onPressLike } = usePostToggleLike();

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

  const refetchAll = () => {
    // 리뷰내용 refetch
    refetchPost();
    // 댓글 refetch
    queryClient.refetchQueries({
      queryKey: ['useGetComments', { postId }],
    });
  };

  const onPressMenu = useCallback(() => {
    // if (post?.writerInfo.userId) {
    //   navigation.navigate('PostMenuBottomSheet', {
    //     postId,
    //     postTopic,
    //     userId: post?.writerInfo.userId,
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <PostDetailComponent post={post} onPressLike={onPressLike} refetchPost={refetchAll} onPressMenu={onPressMenu} />
  );
};
