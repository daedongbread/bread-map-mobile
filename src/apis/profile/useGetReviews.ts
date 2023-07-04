import { useInfiniteQuery } from 'react-query';
import { fetcher } from '../fetcher';

type UseGetReviewsProps = {
  userId: number;
  pageParam?: number;
};

type GetFlagResponse = {
  data: any;
};

export const requestGetReviews = async ({ userId, pageParam }: UseGetReviewsProps) => {
  const resp = await fetcher.get<GetFlagResponse>(`/v1/reviews/users/${userId}?page=${pageParam}`);
  return resp.data.data;
};

const useGetReviews = ({ userId }: UseGetReviewsProps) => {
  const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage, isRefetching } = useInfiniteQuery(
    ['reviewUser', userId],
    ({ pageParam = 0 }) => requestGetReviews({ userId, pageParam }),
    {
      getNextPageParam: lastPage => {
        const nextPage = lastPage.pageNumber + 1;
        return nextPage === lastPage.totalPages ? undefined : nextPage;
      },
    }
  );

  return {
    data,
    loading: isLoading,
    error: isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
};

export { useGetReviews };
