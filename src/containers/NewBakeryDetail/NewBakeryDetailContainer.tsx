import React from 'react';
import { useGetNewBakeries } from '@/apis/bakery/useGetNewBakeries';
import { NewBakeryDetailComponent } from '@/components/NewBakeryDetail';

export const NewBakeryDetailContainer = () => {
  const { data = [] } = useGetNewBakeries();

  return <NewBakeryDetailComponent newBakeries={data} />;
};
