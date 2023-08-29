import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { Post, PostTopic } from './types';

type UseGetPostProps = {
  postTopic: PostTopic;
  postId: number;
};

type GetPostRes = {
  data: Post;
};

const requestPost = async (postTopic: PostTopic, postId: number) => {
  const { data } = await fetcher.get<GetPostRes>(`/v1/posts/${postTopic}/${postId}`);

  return data.data;
};

export const useGetPost = ({ postTopic, postId }: UseGetPostProps) => {
  const { data, isLoading, refetch } = useQuery(['useGetPost', { postId }], () => requestPost(postTopic, postId));

  return {
    post: data,
    isLoading,
    refetch,
  };
};
