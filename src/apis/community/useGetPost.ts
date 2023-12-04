import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { Post, PostTopic } from './types';

type UseGetPostProps = {
  postTopic: PostTopic;
  postId: number;
  onErrorCb: (error: AxiosError) => void;
};

type GetPostRes = {
  data: Post;
};

const requestPost = async (postTopic: PostTopic, postId: number) => {
  const { data } = await fetcher.get<GetPostRes>(`/v1/posts/${postTopic}/${postId}`);

  return data.data;
};

export const useGetPost = ({ postTopic, postId, onErrorCb }: UseGetPostProps) => {
  const { data, isLoading, refetch } = useQuery(['useGetPost', { postId }], () => requestPost(postTopic, postId), {
    onError: error => onErrorCb(error as AxiosError),
  });

  return {
    post: data,
    isLoading,
    refetch,
  };
};
