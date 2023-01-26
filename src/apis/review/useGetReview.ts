import { useQuery } from 'react-query';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetReviewProps = {
  bakeryId: number;
};

type GetReviewResponse = {
  data: BakeryReviewEntity[];
};

export const requestGetReviews = async ({ bakeryId }: UseGetReviewProps) => {
  const resp = await fetcher.get<GetReviewResponse>(`/review/${bakeryId}/all?sort=latest`);
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

const useGetReviews = ({ bakeryId }: UseGetReviewProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetReview', { bakeryId }], () =>
    requestGetReviews({ bakeryId })
  );

  return {
    reviews: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetReviews, useGetReview };
