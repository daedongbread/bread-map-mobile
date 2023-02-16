import { Asset } from 'react-native-image-picker';
import { useMutation, useQueryClient } from 'react-query';
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
    url: `review/${bakeryId}/test`,
    ...rest,
  });
};

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['useGetReviews'],
      });
    },
  });
};
