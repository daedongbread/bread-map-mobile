import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';
import { PostTopic } from './types';

type PostCommentReqeust = {
  postId: number;
  postTopic: PostTopic;
  content: string;
  isFirstDepth: boolean;
  parentId: number;
  targetCommentUserId: number;
};

const requestPostComment = async ({
  postId,
  postTopic,
  content,
  isFirstDepth,
  parentId,
  targetCommentUserId,
}: PostCommentReqeust) => {
  await fetcher.post('/v1/comments', {
    postId,
    postTopic,
    content,
    isFirstDepth,
    parentId,
    targetCommentUserId,
  });
};

export const usePostComment = () => {
  return useMutation({
    mutationFn: requestPostComment,
  });
};
