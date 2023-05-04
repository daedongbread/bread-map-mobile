import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

export type UsePostReportRequest = {
  name: string;
  location: string;
  content: string;
  images: string[];
};

const postReport = (request: UsePostReportRequest) => {
  return fetcher.post('/v1/bakeries/bakery-add-reports', request);
};

export const usePostReportBakery = () => {
  return useMutation({
    mutationFn: postReport,
  });
};
