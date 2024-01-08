import { AxiosError } from 'axios';
import React from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from 'react-query';
import { useGetPost, usePostToggleLike } from '@/apis/community';
import { PostDetailComponent } from '@/components/Community/PostDetailComponent';
import { CommunityStackScreenProps } from '@/pages/MainStack/Community';
import { useNavigation, useRoute } from '@react-navigation/native';

type Route = CommunityStackScreenProps<'PostDetail'>['route'];
type Navigation = CommunityStackScreenProps<'PostDetail'>['navigation'];

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

  if (!post) {
    return null;
  }

  return <PostDetailComponent post={post} onPressLike={onPressLike} refetchPost={refetchAll} />;
};
