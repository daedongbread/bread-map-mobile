import { useMutation } from 'react-query';
import { UseMutationOptions } from 'react-query/types/react/types';
import { fetcher } from '@/apis/fetcher';

type PostFollowProps = {
  userId: number;
};

const postFollow = ({ userId }: PostFollowProps): Promise<void> => {
  return fetcher.post('/user/follow', { userId }).then(res => res.data());
};

export const useFollow = (options: UseMutationOptions<void, unknown, PostFollowProps, any>) => {
  return useMutation({
    mutationFn: postFollow,
    ...options,
  });
};
