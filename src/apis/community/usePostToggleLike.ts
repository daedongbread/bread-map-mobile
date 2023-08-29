import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

const postToggleLike = (postId: number) => {
  return fetcher.post(`/v1/posts/like/${postId}`);
};

export const usePostToggleLike = () => {
  return useMutation({
    mutationFn: postToggleLike,
  });
};
