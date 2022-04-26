import React from 'react';
import { Bakery } from '@/router/types';
import { useBakeryDetailMethod } from './useBakeryDetailMethod';

type BakeryDetailValue = {
  bakery: Bakery | null;
  updateBakery: (bakery: Bakery) => void;
};

const BakeryDetailContext = React.createContext<BakeryDetailValue | null>(null);

const BakeryDetailProvider: React.FC = ({ children }) => {
  const { bakery, updateBakery } = useBakeryDetailMethod();

  return <BakeryDetailContext.Provider value={{ bakery, updateBakery }}>{children}</BakeryDetailContext.Provider>;
};

const useBakeryDetail = () => {
  const context = React.useContext(BakeryDetailContext);

  if (!context) {
    throw new Error('Not Found useBakeryDetailContext');
  }

  return context;
};

export { BakeryDetailProvider, useBakeryDetail };
