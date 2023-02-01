import { useQuery } from 'react-query';
import { BakeryReviewEntity, ReviewEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetReviewProps = {
  bakeryId: number;
  sortBy?: string;
};

type GetReviewResponse = {
  data: ReviewEntity;
};

export const requestGetReviews = async ({ bakeryId, sortBy }: UseGetReviewProps) => {
  const resp = await fetcher.get<GetReviewResponse>(`/review/bakery/${bakeryId}?sortBy=${sortBy}`);
  return resp.data.data;
};

export const requestGetReview = async ({ reviewId }: { reviewId: number }) => {
  const resp = await fetcher.get<{
    data: BakeryReviewEntity;
  }>(`/review/${reviewId}`);
  return resp.data.data;
};

const useGetReview = ({ reviewId }: { reviewId: number }) => {
  return useQuery(['useGetReviewByReviewId', { reviewId }], () => requestGetReview({ reviewId }));
};

const useGetReviews = ({ bakeryId, sortBy = 'latest' }: UseGetReviewProps) => {
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
