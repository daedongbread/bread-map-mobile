import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

const blockUser = (userId: number) => {
  return fetcher.post('/v1/users/block', {
    userId,
  });
};

export const useBlockUser = () => {
  return useMutation({
    mutationFn: blockUser,
  });
};
