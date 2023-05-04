import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

type UserReportReviewRequest = {
  reviewId: number;
  reason: string;
  content: string;
};

const reportReview = ({ reviewId, content, reason }: UserReportReviewRequest) => {
  return fetcher.post(`/v1/reviews/${reviewId}/report`, {
    reason,
    content,
  });
};

export const useReportReview = () => {
  return useMutation({
    mutationFn: reportReview,
  });
};
