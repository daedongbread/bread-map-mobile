import { useQuery } from 'react-query';
import { ReviewDetailEntity, ReviewEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetReviewsProps = {
  bakeryId: number;
  sortBy?: string;
};

type UseGetReviewProps = {
  reviewId: number;
};

type GetReviewsResponse = {
  data: ReviewEntity;
};

type GetReviewResponse = {
  data: ReviewDetailEntity;
};

export const requestGetReviews = async ({ bakeryId, sortBy }: UseGetReviewsProps) => {
  const resp = await fetcher.get<GetReviewsResponse>(`/review/bakery/${bakeryId}`, {
    params: {
      sortBy,
      // lastId: null,
      // lastRating: null,
      page: 0,
    },
  });
  return resp.data.data;
};

export const requestGetReview = async ({ reviewId }: { reviewId: number }) => {
  const resp = await fetcher.get<GetReviewResponse>(`/review/${reviewId}`);
  return resp.data.data;
};

const useGetReview = ({ reviewId }: UseGetReviewProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['UseGetReview', { reviewId }], () =>
    requestGetReview({ reviewId })
  );

  return {
    review: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

const useGetReviews = ({ bakeryId, sortBy = 'latest' }: UseGetReviewsProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetReviews', { bakeryId }], () =>
    requestGetReviews({ bakeryId, sortBy })
  );

  return {
    reviews: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetReviews, useGetReview };
