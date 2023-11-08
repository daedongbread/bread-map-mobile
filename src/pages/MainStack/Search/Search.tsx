import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { SearchEntity } from '@/apis/bakery/types';
import { useSearchQuery } from '@/apis/bakery/useSearch';
import { SearchingComponent } from '@/components/Search';
import { SearchHistoryList } from '@/components/Search/SearchHistoryList';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { PopularSearchContainer } from '@/containers/Search';
import { useDebounce } from '@/hooks/useDebounce';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Header } from '@/pages/MainStack/Search/Header';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { getStorageSearchHistory, setStorageSearchHistory } from '@/utils/storage/searchHistory';

type Props = MainStackScreenProps<'Search'>;

const Search: React.FC<Props> = ({ navigation }) => {
  const { currentPosition, getLocation } = useGeolocation();
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchEntity[]>([]);

  const word = useDebounce(searchValue, 300);

  const { data } = useSearchQuery({
    word,
    longitude: currentPosition?.longitude,
    latitude: currentPosition?.latitude,
  });

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.pop();
    }
  };

  const navigateReport = useCallback(() => {
    navigation.push('ReportBakeryStack', {
      screen: 'ReportBakeryOnboard',
    });
  }, [navigation]);

  const navigateDetail = useCallback(
    (bakery: SearchEntity) => {
      navigation.push('MainTab', {
        screen: 'HomeStack',
        params: {
          screen: 'Bakery',
          params: {
            screen: 'BakeryDetailHome',
            params: {
              bakeryId: bakery.bakeryId,
              bakeryName: bakery.bakeryName,
            },
          },
        },
      });
    },
    [navigation]
  );

  const appendSearchHistory = useCallback((searchEntity: SearchEntity) => {
    setSearchHistory(prevState => {
      const newSearchHistory = [searchEntity, ...prevState.filter(el => el.bakeryId !== searchEntity.bakeryId)];

      setStorageSearchHistory(newSearchHistory);

      return newSearchHistory;
    });
  }, []);

  const removeSearchHistory = useCallback((bakeryId: number) => {
    setSearchHistory(prevState => {
      const newSearchHistory = prevState.filter(el => el.bakeryId !== bakeryId);

      setStorageSearchHistory(newSearchHistory);

      return newSearchHistory;
    });
  }, []);

  const onPressBakery = useCallback(
    (searchEntity: SearchEntity) => {
      navigateDetail(searchEntity);
      appendSearchHistory(searchEntity);
    },
    [appendSearchHistory, navigateDetail]
  );

  useEffect(() => {
    getStorageSearchHistory().then(el => {
      setSearchHistory(el);
    });
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <SafeAreaView style={[styles.fullScreen]}>
      <Header value={searchValue} onChangeText={setSearchValue} onPress={goBack} />
      <ScrollView>
        {searchValue && data ? (
          <>
            {/* <SearchBakeryList bakeries={data} onPressReport={navigateReport} onPressBakery={onPressBakery} /> */}

            <SearchingComponent searchValue={searchValue} />
          </>
        ) : (
          <>
            {/* 최근 검색 */}
            <SearchHistoryList
              searchHistory={searchHistory}
              onPressBakery={onPressBakery}
              removeSearchHistory={removeSearchHistory}
            />

            <SplitRow height={20} />

            {/* 인기 검색 */}
            <PopularSearchContainer />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    // paddingVertical: 16,
    // paddingHorizontal: 16,
  },
});

export { Search };
