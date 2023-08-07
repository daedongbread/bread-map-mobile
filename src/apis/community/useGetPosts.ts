import { useInfiniteQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { Post, PostTopic } from './types';

type GetPostsRes = {
  data: {
    pageNumber: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    size: number;
    contents: Post[];
  };
};

type UseGetInfinitePostsProps = {
  postTopic: PostTopic;
  pageParam?: number;
};

const requestPosts = async ({ postTopic, pageParam }: UseGetInfinitePostsProps) => {
  const { data } = await fetcher.get<GetPostsRes>(`/v1/posts/cards/${postTopic}`, {
    params: {
      reviewOffset: 0,
      postOffset: 0,
      page: pageParam,
    },
  });

  return data.data;
};

export const useGetInfinitePosts = ({ postTopic }: UseGetInfinitePostsProps) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
    ['useGetInfinitePosts'],
    ({ pageParam = 0 }) => requestPosts({ postTopic, pageParam }),
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
    posts: data?.pages,
    pageParams: data?.pageParams,
    loading: isLoading,
    error: isError,
    hasNextPage,
    fetchNextPage,
    refetch: refetchPage,
    remove,
  };
};
