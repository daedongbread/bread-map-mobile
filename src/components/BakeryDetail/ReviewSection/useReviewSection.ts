import { useBakeryDetail } from '@/provider/BakeryDetailProvider';

export const useReviewSection = () => {
  const { bakery } = useBakeryDetail();

  return {
    bakeryReviews: bakery?.bakeryReviews!,
  };
};
