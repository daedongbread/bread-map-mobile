import React, { useEffect } from 'react';
import { useGetBakery } from '@/apis/bakery';
import { BakerySingleEntity } from '@/apis/bakery/types';
import { useBakeryDetailMethod } from './useBakeryDetailMethod';

type BakeryDetailValue = {
  bakery: BakerySingleEntity | null;
  updateBakery: (bakery: BakerySingleEntity) => void;
};

const BakeryDetailContext = React.createContext<BakeryDetailValue | null>(null);

const BakeryDetailProvider: React.FC = ({ children }) => {
  const { bakery, updateBakery } = useBakeryDetailMethod();

  return <BakeryDetailContext.Provider value={{ bakery, updateBakery }}>{children}</BakeryDetailContext.Provider>;
};

const useBakeryDetail = (bakeryId?: number) => {
  const context = React.useContext(BakeryDetailContext);

  const { bakery } = useGetBakery({ bakeryId: bakeryId! });

  useEffect(() => {
    if (bakery != null) {
      context?.updateBakery(bakery!);
    }
  }, [bakery, context]);

  if (!context) {
    throw new Error('Not Found useBakeryDetailContext');
  }

  return context;
};

export { BakeryDetailProvider, useBakeryDetail };
