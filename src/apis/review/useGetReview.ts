import { useInfiniteQuery, useQuery } from 'react-query';
import { ReviewDetailEntity, ReviewEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetReviewsProps = {
  bakeryId: number;
  sortBy?: string;
  pageParam?: number;
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

export const requestGetReviews = async ({ bakeryId, sortBy, pageParam }: UseGetReviewsProps) => {
  const resp = await fetcher.get<GetReviewsResponse>(`/v1/reviews/bakeries/${bakeryId}`, {
    params: {
      sortBy,
      page: pageParam,
    },
  });
  return resp.data.data;
};

export const requestGetReview = async ({ reviewId }: { reviewId: number }) => {
  const resp = await fetcher.get<GetReviewResponse>(`/v1/reviews/${reviewId}`);
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
    requestGetReviews({ bakeryId, sortBy, pageParam: 0 })
  );

  return {
    reviews: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

const useGetInfiniteReviews = ({ bakeryId, sortBy = 'latest' }: UseGetReviewsProps) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
    ['useGetInfiniteReviews', { bakeryId }],
    ({ pageParam = 0 }) => requestGetReviews({ bakeryId, sortBy, pageParam }),
    {
      getNextPageParam: lastPage => {
        return lastPage.totalPages - 1 === lastPage.pageNumber || lastPage.contents.length === 0
          ? null
          : lastPage.pageNumber + 1;
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

export { useGetReviews, useGetReview, useGetInfiniteReviews };
