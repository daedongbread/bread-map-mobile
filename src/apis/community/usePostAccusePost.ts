import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';
import { PostTopic } from './types';

type UsePostAccusePostRequest = {
  postTopic: PostTopic;
  targetId: number;
  reason: string;
  content: string;
};

const accusePost = ({ postTopic, targetId, content, reason }: UsePostAccusePostRequest) => {
  return fetcher.post(`/v1/reports/${postTopic}/${targetId}`, {
    reason,
    content,
  });
};

export const usePostAccusePost = () => {
  return useMutation({
    mutationFn: accusePost,
  });
};
