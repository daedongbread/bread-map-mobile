import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

const postToggleLike = (commentId: number) => {
  return fetcher.post(`/v1/comments/like/${commentId}`);
};

export const usePostToggleCommentsLike = () => {
  return useMutation({
    mutationFn: postToggleLike,
  });
};
