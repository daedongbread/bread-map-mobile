import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

const blockUser = (userId: number) => {
  return fetcher.post('/user/block', {
    userId,
  });
};

export const useBlockUser = () => {
  return useMutation({
    mutationFn: blockUser,
  });
};
