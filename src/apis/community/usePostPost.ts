import { useMutation, useQueryClient } from 'react-query';
import { fetcher } from '../fetcher';
import { PostTopic } from './types';

type PostPostRequest = {
  title: string;
  content: string;
  images: string[];
  postTopic: PostTopic;
};

const postPost = (request: PostPostRequest) => {
  return fetcher.post('/v1/posts', request);
};

export const usePostPost = (postTopic: PostTopic) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPost,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['useGetInfinitePosts', { postTopic }],
      });
    },
  });
};
