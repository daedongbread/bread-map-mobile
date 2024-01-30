import { useInfiniteQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { Comment, PostTopic } from './types';

type UseGetCommentsProps = {
  postId: number;
  postTopic: PostTopic;
  page?: number;
};

type GetCommentsRes = {
  data: {
    pageNumber: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    size: number;
    contents: Comment[];
  };
};

const requestComments = async (postId: number, postTopic: PostTopic, page: number) => {
  const { data } = await fetcher.get<GetCommentsRes>(`/v1/comments/${postTopic}/${postId}/${page}`);

  return data.data;
};

export const useGetInfiniteComments = ({ postId, postTopic }: UseGetCommentsProps) => {
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    ['useGetInfiniteComments', { postId }],
    ({ pageParam = 0 }) => requestComments(postId, postTopic, pageParam),
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
    comments: data?.pages,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch: refetchPage,
  };
};
