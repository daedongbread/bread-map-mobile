import { useMutation } from 'react-query';
import { ReportType } from '@/containers/Community/AccuseCommentContainer';
import { fetcher } from '../fetcher';

type UsePostAccusePostRequest = {
  reportType: ReportType;
  targetId: number;
  reason: string;
  content: string;
};

const accusePost = ({ reportType, targetId, content, reason }: UsePostAccusePostRequest) => {
  return fetcher.post(`/v1/reports/${reportType}/${targetId}`, {
    reason,
    content,
  });
};

export const usePostAccusePost = () => {
  return useMutation({
    mutationFn: accusePost,
  });
};
