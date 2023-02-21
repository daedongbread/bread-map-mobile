import { Asset } from 'react-native-image-picker';
import { useMutation } from 'react-query';
import { fetchImageAndData } from '@/utils/fetch/fetchImageAndData';

type PostReportMenu = {
  bakeryId: number;
  images: Asset[];
  data: any;
  dataKey?: string;
  imagesKey?: string;
};

const postReportMenu = ({ bakeryId, ...rest }: PostReportMenu) => {
  return fetchImageAndData({
    url: `bakery/report/${bakeryId}/product`,
    ...rest,
  });
};

export const usePostReportMenu = () => {
  return useMutation({
    mutationFn: postReportMenu,
  });
};
