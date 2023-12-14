import React from 'react';
import { PopularKeywordsEntity } from '@/apis/search';
import { PopularSearchComponent } from '@/components/Search';

type Props = {
  keywords: PopularKeywordsEntity | undefined;
  onPress: (name: string) => void;
};

export const PopularSearchContainer = ({ keywords, onPress }: Props) => {
  if (!keywords?.length) {
    return null;
  }

  return <PopularSearchComponent keywords={keywords} onPress={onPress} />;
};
