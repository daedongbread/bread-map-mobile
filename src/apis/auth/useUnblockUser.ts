import { useMutation, useQueryClient } from 'react-query';
import { fetcher } from '@/apis/fetcher';

const unBlockUser = (userId: number) => {
  return fetcher.delete('/v1/users/block', {
    data: {
      userId,
    },
  });
};

export const useUnBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unBlockUser,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['useGetBlockList'],
      });
    },
  });
};
