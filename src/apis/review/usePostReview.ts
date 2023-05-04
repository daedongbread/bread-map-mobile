import { useMutation, useQueryClient } from 'react-query';
import { fetcher } from '../fetcher';

type PostReviewRequest = {
  bakeryId: number;
  request: any;
};

const postReview = ({ bakeryId, request }: PostReviewRequest) => {
  return fetcher.post(`/v1/reviews/bakeries/${bakeryId}`, request);
};

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReview,
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
