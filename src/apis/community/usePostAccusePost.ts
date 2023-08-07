import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

const accusePost = () => {
  return fetcher.post('/v1/reports//', {});
};

export const usePostAccusePost = () => {
  return useMutation({
    mutationFn: accusePost,
  });
};
