import { useMutation, useQueryClient } from 'react-query';
import { fetcher } from '../fetcher';

const blockUser = (userId: number) => {
  return fetcher.post('/v1/users/block', {
    userId,
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['useGetInfiniteReviews'],
      });
      queryClient.refetchQueries({
        queryKey: ['useGetReviews'],
      });
    },
  });
};
