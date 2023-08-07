import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { Post } from './types';

type GetTopPostsRes = {
  data: Post[];
};

const requestTopPosts = async () => {
  const { data } = await fetcher.get<GetTopPostsRes>('/v1/posts/hot');

  return data.data;
};

export const useGetTopPosts = () => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetTopPosts'], () => requestTopPosts());

  return {
    posts: data,
    isLoading,
    isError,
    refetch,
  };
};
