import { useQuery } from 'react-query';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetReviewProps = {
  bakeryId: number;
};

type GetReviewResponse = {
  data: BakeryReviewEntity[];
};

const requestGetReviews = async ({ bakeryId }: UseGetReviewProps) => {
  const resp = await fetcher.get<GetReviewResponse>(`/review/${bakeryId}/simple?sort=latest`);
  return resp.data.data;
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

export { useGetReviews };
