import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

const unLikeReview = (reviewId: number) => {
  return fetcher.delete(`/review/${reviewId}/unlike`);
};

export const useUnLikeReview = () => {
  return useMutation({
    mutationFn: unLikeReview,
  });
};
