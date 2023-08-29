import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { PostTopic } from './types';

type UseGetCommentsProps = {
  postId: number;
  postTopic: PostTopic;
  page: number;
};

const requestComments = async (postId: number, postTopic: PostTopic, page: number) => {
  const { data } = await fetcher.get(`/v1/comments/${postTopic}/${postId}/${page}`);

  return data.data;
};

export const useGetComments = ({ postId, postTopic, page = 0 }: UseGetCommentsProps) => {
  const { data, isLoading, refetch } = useQuery(['useGetComments', { postId }], () =>
    requestComments(postId, postTopic, page)
  );

  return {
    comments: data,
    isLoading,
    refetch,
  };
};
