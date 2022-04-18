import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryDetailTabScreenProps } from '@/router';

export const useMenuSection = ({ route }: BakeryDetailTabScreenProps<'BakeryDetailMenu'>) => {
  const { bakery } = useBakeryDetail();

  return {
    bakeryMenu: bakery?.bakeryMenu!,
  };
};
