import { useQuery } from 'react-query';
import { ReviewEntity } from '../bakery/types';
import { fetcher } from '../fetcher';

type UseGetMenuReviewsProps = {
  bakeryId: number;
  productId: number;
  sortBy?: string;
};

type GetMenuReviewsResponse = {
  data: ReviewEntity;
};

const requestGetMenuReviews = async ({ bakeryId, productId, sortBy }: UseGetMenuReviewsProps) => {
  console.log(sortBy);

  const res = await fetcher.get<GetMenuReviewsResponse>(`/review/bakery/${bakeryId}/product/${productId}`, {
    params: {
      sortBy,
      // lastId: null,
      // lastRating: null,
      page: 0,
    },
  });
  return res.data.data;
};

const useGetMenuReviews = ({ bakeryId, productId, sortBy }: UseGetMenuReviewsProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetMenuReviews', { bakeryId, productId }], () =>
    requestGetMenuReviews({ bakeryId, productId, sortBy })
  );

  return {
    reviews: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetMenuReviews };
