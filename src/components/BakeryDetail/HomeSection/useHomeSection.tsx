import React from 'react';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryDetailTabScreenProps } from '@/router';

export const useHomeSection = ({ route }: BakeryDetailTabScreenProps<'BakeryDetailHome'>) => {
  const { bakery, updateBakery } = useBakeryDetail();

  React.useEffect(() => {
    updateBakery(route.params);
  }, [updateBakery, route.params]);

  return { bakery };
};
