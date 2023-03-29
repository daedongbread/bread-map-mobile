import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

const likeReview = (reviewId: number) => {
  return fetcher.post(`/v1/reviews/${reviewId}/like`);
};

export const useLikeReview = () => {
  return useMutation({
    mutationFn: likeReview,
  });
};
