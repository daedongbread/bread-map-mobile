import { useMutation, useQueryClient } from 'react-query';
import { fetcher } from '../fetcher';

const deleteComment = async (commentId: number) => {
  return await fetcher.delete(`/v1/comments/${commentId}`);
};

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['useGetComments', { postId }],
      });
    },
  });
};
