import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

type PostReportMenu = {
  bakeryId: number;
  request: any;
};

const postReportMenu = ({ bakeryId, request }: PostReportMenu) => {
  return fetcher.post(`/v1/bakeries/${bakeryId}/product-add-reports`, request);
};

export const usePostReportMenu = () => {
  return useMutation({
    mutationFn: postReportMenu,
  });
};
