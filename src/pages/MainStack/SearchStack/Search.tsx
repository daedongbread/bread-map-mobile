import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchEntity } from '@/apis/bakery/types';
import { useGetRecentKeywords } from '@/apis/search';
import { useGetPopularKeywords } from '@/apis/search/useGetPopularKeywords';
import { useGetSuggestions } from '@/apis/search/useGetSuggestions';
import { SearchingComponent } from '@/components/Search';
import { SearchHistoryList } from '@/components/Search/SearchHistoryList';
import { PrevIcon } from '@/components/Shared/Icons/PrevIcon';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { PopularSearchContainer } from '@/containers/Search';
import { useDebounce } from '@/hooks/useDebounce';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Header } from '@/pages/MainStack/SearchStack/Header';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { getStorageSearchHistory, setStorageSearchHistory } from '@/utils/storage/searchHistory';

type Props = MainStackScreenProps<'SearchStack'>;

const Search: React.FC<Props> = ({ navigation }) => {
  const { currentPosition, getLocation } = useGeolocation();
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchEntity[]>([]);

  // 검색 창에 검색어 state, debounce로 delay set state
  const word = useDebounce(searchValue, 300);

  // 검색 중 API
  const { data } = useGetSuggestions({ keyword: word });
  console.log('data', data);

  // 최근 검색어 API
  const { recentKeywords } = useGetRecentKeywords();
  console.log('recentKeywords', recentKeywords);

  // 인기 검색어 API
  const { popularKeywords } = useGetPopularKeywords();
  console.log('popularKeywords', popularKeywords);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.pop();
    }
  };

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

  const navigateSearchComplete = (name: string) => {
    navigation.push('SearchStack', {
      screen: 'SearchComplete',
      params: {
        keyword: name,
        longitude: currentPosition?.longitude,
        latitude: currentPosition?.latitude,
      },
    });
  };

  useEffect(() => {
    getStorageSearchHistory().then(el => {
      setSearchHistory(el);
    });
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const BackButton = () => {
    return (
      <TouchableOpacity onPress={goBack}>
        <PrevIcon />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.fullScreen]}>
      <Header
        value={searchValue}
        onChangeText={setSearchValue}
        LeftIcon={BackButton}
        onSubmitEditing={() => navigateSearchComplete(searchValue)}
      />
      <ScrollView>
        {searchValue && data ? (
          <>
            {/* 검색 진행중 component */}
            <SearchingComponent
              searchValue={word}
              suggestions={data}
              onPress={(name: string) => {
                // 검색 하면 완료 페이지로 이동
                navigateSearchComplete(name);
              }}
            />
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
