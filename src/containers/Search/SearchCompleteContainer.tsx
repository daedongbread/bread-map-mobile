import React, { useState } from 'react';
import { useSearchBakery } from '@/apis/search/useSearchBakery';
import { SearchCompleteComponent } from '@/components/Search';
import { RootRouteProps } from '@/pages/MainStack/SearchStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export const SearchCompleteContainer = () => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<'SearchComplete'>>();
  const { keyword, latitude, longitude } = route.params;
  const [searchType, setSearchType] = useState('DISTANCE');

  const { data } = useSearchBakery({ keyword, latitude, longitude, searchType });

  const goMap = () => {
    navigation.navigate('SearchCompleteMap', {
      keyword,
      latitude,
      longitude,
    });
  };

  const goHome = () => {
    navigation.navigate('MainTab');
  };

  const onDistanceSortingPress = () => {
    setSearchType('DISTANCE');
  };

  const onPopularSortingPress = () => {
    setSearchType('POPULAR');
  };

  if (!data) {
    return null;
  }

  return (
    <SearchCompleteComponent
      bakeries={data.searchResultDtoList || []}
      subwayStationName={data.subwayStationName}
      keyword={keyword}
      goMap={goMap}
      goHome={goHome}
      onDistanceSortingPress={onDistanceSortingPress}
      onPopularSortingPress={onPopularSortingPress}
      searchType={searchType}
    />
  );
};
