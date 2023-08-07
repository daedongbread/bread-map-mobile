import { useMutation, useQueryClient } from 'react-query';
import { fetcher } from '../fetcher';

const deletePost = async (postId: number) => {
  return await fetcher.delete(`/v1/posts/${postId}`);
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
