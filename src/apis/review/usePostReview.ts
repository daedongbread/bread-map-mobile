import { Asset } from 'react-native-image-picker';
import { useMutation } from 'react-query';
import { fetchImageAndData } from '@/utils/fetch/fetchImageAndData';

type PostReviewRequest = {
  bakeryId: number;
  images: Asset[];
  data: any;
  dataKey?: string;
  imagesKey?: string;
};

const postReview = ({ bakeryId, ...rest }: PostReviewRequest) => {
  return fetchImageAndData({
    url: `/review/${bakeryId}/test`,
    ...rest,
  });
};

export const usePostReview = () => {
  return useMutation({
    mutationFn: postReview,
  });
};
