import { useBakeryDetail } from '@/provider/BakeryDetailProvider';

export const useMenuSection = () => {
  const { bakery } = useBakeryDetail();

  return {
    bakeryMenu: bakery?.bakeryMenu!,
  };
};
