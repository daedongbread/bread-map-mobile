import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

type ReportPhotoRequest = {
  bakeryId: number;
  formData: any;
};

const reportPhoto = ({ bakeryId, formData }: ReportPhotoRequest) => {
  return fetcher.post(`/v1/bakeries/${bakeryId}/bakery-report-images`, formData, {
    headers: { 'content-type': 'multipart/form-data' },
    transformRequest: data => data,
  });
};

export const useReportPhoto = () => {
  return useMutation({
    mutationFn: reportPhoto,
  });
};
