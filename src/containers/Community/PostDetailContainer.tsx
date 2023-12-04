import React, { useCallback } from 'react';
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

  const { post, refetch: refetchPost } = useGetPost({ postTopic, postId });

  const refetchAll = () => {
    // 리뷰내용 refetch
    refetchPost();
    // 댓글 refetch
    queryClient.refetchQueries({
      queryKey: ['useGetComments', { postId }],
    });
  };

  const onPressMenu = useCallback(() => {
    if (post?.writerInfo.userId) {
      navigation.navigate('PostMenuBottomSheet', {
        postId,
        postTopic,
        userId: post?.writerInfo.userId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <PostDetailComponent post={post} onPressLike={onPressLike} onPressMenu={onPressMenu} refetchPost={refetchAll} />
  );
};
