import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

type ReportPhotoRequest = {
  bakeryId: number;
  request: any;
};

const reportPhoto = ({ bakeryId, request }: ReportPhotoRequest) => {
  return fetcher.post(`/v1/bakeries/${bakeryId}/bakery-report-images`, request);
};

export const useReportPhoto = () => {
  return useMutation({
    mutationFn: reportPhoto,
  });
};
