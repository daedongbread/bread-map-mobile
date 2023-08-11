import React from 'react';
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

  const { mutateAsync: postToggleLike } = usePostToggleLike();

  const { post, refetch: refetchPost } = useGetPost({ postTopic, postId });

  const onPressLike = async (_postId: number) => {
    await postToggleLike(_postId);
    refetchPost();
  };

  const onPressMenu = () => {
    if (post?.writerInfo.userId) {
      navigation.navigate('PostMenuBottomSheet', {
        postId,
        postTopic,
        userId: post?.writerInfo.userId,
      });
    }
  };

  if (!post) {
    return null;
  }

  return <PostDetailComponent postTopic={postTopic} post={post} onPressLike={onPressLike} onPressMenu={onPressMenu} />;
};
