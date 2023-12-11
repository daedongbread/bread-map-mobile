import { useInfiniteQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { Notification } from './types';

type GetNotificationsRes = {
  data: {
    pageNumber: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    size: number;
    contents: Notification[];
  };
};

type UseGetInfiniteNotificationsProps = {
  page?: number;
  lastId?: number;
};

const requestNotifications = async ({ page, lastId }: UseGetInfiniteNotificationsProps) => {
  const { data } = await fetcher.get<GetNotificationsRes>('/v1/notices', {
    params: {
      page,
      lastId,
    },
  });

  return data.data;
};

export const useGetInfiniteNotifications = ({ lastId }: UseGetInfiniteNotificationsProps) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
    ['useGetInfiniteNotifications'],
    ({ pageParam = 0 }) => requestNotifications({ page: pageParam, lastId }),
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
    notifications: data?.pages,
    pageParams: data?.pageParams,
    loading: isLoading,
    error: isError,
    hasNextPage,
    fetchNextPage,
    refetch: refetchPage,
    remove,
  };
};
