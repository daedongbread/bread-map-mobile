import React, { memo } from 'react';
import { View } from 'react-native';
import { SearchedBakeryNotFound } from '@/components/Search/SearchedBakeryNotFound';

type Props = {
  bakeries: Array<{
    name: string;
    reviews: Array<number>;
    distance: number;
  }>;
};
const SearchBakeryList: React.FC<Props> = memo(({ bakeries }) => {
  if (!bakeries.length) {
    return <SearchedBakeryNotFound />;
  }

  return <View />;
});

export { SearchBakeryList };
