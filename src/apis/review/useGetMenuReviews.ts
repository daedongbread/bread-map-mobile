import { useQuery } from 'react-query';
import { requestGetReviews } from './useGetReview';

type UseGetReviewProps = {
  bakeryId: number;
  productName: string;
};

const useGetMenuReviews = ({ bakeryId, productName }: UseGetReviewProps) => {
  return useQuery(['useGetReview', { bakeryId }], () => requestGetReviews({ bakeryId }), {
    select: data =>
      data.filter(review => {
        review.productRatingList.filter(product => product.productName === productName).length > 0;
      }),
  });
};

export { useGetMenuReviews };
