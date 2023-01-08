import { fetcher } from '../fetcher';

export type UsePostReportRequest = {
  name: string;
  location: string;
  content: string;
};

export const usePostReport = (request: UsePostReportRequest) => {
  return fetcher.post('/bakery/report/add', request);
};
