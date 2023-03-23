import { useInfiniteQuery, useQuery } from 'react-query';
import { ReviewEntity } from '../bakery/types';
import { fetcher } from '../fetcher';

type UseGetMenuReviewsProps = {
  bakeryId: number;
  productId: number;
  sortBy?: string;
  pageParam?: number;
};

type GetMenuReviewsResponse = {
  data: ReviewEntity;
};

const requestGetMenuReviews = async ({ bakeryId, productId, sortBy, pageParam }: UseGetMenuReviewsProps) => {
  const res = await fetcher.get<GetMenuReviewsResponse>(`/review/bakery/${bakeryId}/product/${productId}`, {
    params: {
      sortBy,
      page: pageParam,
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

const useGetInfiniteMenuReviews = ({ bakeryId, productId, sortBy }: UseGetMenuReviewsProps) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
    ['useGetInfiniteMenuReviews', { bakeryId }],
    ({ pageParam = 0 }) => requestGetMenuReviews({ bakeryId, productId, sortBy, pageParam }),
    {
      getNextPageParam: lastPage => {
        return lastPage.totalPages - 1 === lastPage.pageNumber ? null : lastPage.pageNumber + 1;
      },
    }
  );

  const refetchPage = (pageNum?: number) => {
    if (pageNum === undefined) {
      refetch();
    } else {
      refetch({ refetchPage: (page, index) => index === pageNum });
    }
  };

  return {
    reviews: data?.pages,
    pageParams: data?.pageParams,
    loading: isLoading,
    error: isError,
    hasNextPage,
    fetchNextPage,
    refetch: refetchPage,
    remove,
  };
};

export { useGetMenuReviews, useGetInfiniteMenuReviews };
