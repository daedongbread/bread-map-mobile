import React, { useCallback } from 'react';
import { useGetPost, usePostToggleLike } from '@/apis/community';
import { PostDetailComponent } from '@/components/Community/PostDetailComponent';
import { CommunityStackScreenProps } from '@/pages/MainStack/Community';
import { useNavigation, useRoute } from '@react-navigation/native';

type Route = CommunityStackScreenProps<'PostDetail'>['route'];
type Navigation = CommunityStackScreenProps<'PostDetail'>['navigation'];

export const PostDetailContainer = () => {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();

  const { postId, postTopic } = params;

  const { mutateAsync: onPressLike } = usePostToggleLike();

  const { post, refetch: refetchPost } = useGetPost({ postTopic, postId });

  const onPressMenu = useCallback(() => {
    if (post?.writerInfo.userId) {
      navigation.navigate('PostMenuBottomSheet', {
        postId,
        postTopic,
        userId: post?.writerInfo.userId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return null;
  }

  return (
    <PostDetailComponent post={post} onPressLike={onPressLike} onPressMenu={onPressMenu} refetchPost={refetchPost} />
  );
};
