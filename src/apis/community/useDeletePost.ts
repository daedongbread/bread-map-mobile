import { useMutation, useQueryClient } from 'react-query';
import { fetcher } from '../fetcher';
import { PostTopic } from './types';

type UseDeletePostParams = {
  postId: number;
  postTopic: PostTopic;
};

const deletePost = async ({ postId, postTopic }: UseDeletePostParams) => {
  return await fetcher.delete(`/v1/posts/${postTopic}/${postId}`);
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['useGetInfinitePosts'],
      });
    },
  });
};
