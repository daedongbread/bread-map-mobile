import React, { useState } from 'react';
import { useSearchBakery } from '@/apis/search/useSearchBakery';
import { SearchCompleteComponent } from '@/components/Search';
import { RootRouteProps } from '@/pages/MainStack/SearchStack/Stack';
import { useRoute } from '@react-navigation/native';

export const SearchCompleteContainer = () => {
  const route = useRoute<RootRouteProps<'SearchComplete'>>();
  const { keyword, latitude, longitude } = route.params;
  const [searchType, setSearchType] = useState('DISTANCE');

  const { data } = useSearchBakery({ keyword, latitude, longitude, searchType });

  if (!data) {
    return null;
  }

  return (
    <SearchCompleteComponent
      bakeries={data.searchResultDtoList || []}
      keyword={keyword}
      subwayStationName={data.subwayStationName}
      searchType={searchType}
      setSearchType={setSearchType}
    />
  );
};
