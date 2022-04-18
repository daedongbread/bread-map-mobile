import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryDetailTabScreenProps } from '@/router';

export const useReviewSection = ({ route }: BakeryDetailTabScreenProps<'BakeryDetailReview'>) => {
  const { bakery } = useBakeryDetail();

  return {
    bakeryReviews: bakery?.bakeryReviews!,
  };
};
