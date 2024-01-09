import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SearchEntity } from '@/apis/bakery/types';
import { useSearchQuery } from '@/apis/bakery/useSearch';
import { SearchBakeryList } from '@/components/Search/SearchBakeryList';
import { SearchHistoryList } from '@/components/Search/SearchHistoryList';
import { useDebounce } from '@/hooks/useDebounce';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Header } from '@/pages/MainStack/Search/Header';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { getStorageSearchHistory, setStorageSearchHistory } from '@/utils/storage/searchHistory';
import { Text } from '@shared/Text';

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
      navigation.push('BakeryDetail', {
        screen: 'BakeryDetailHome',
        params: {
          bakeryId: bakery.bakeryId,
          bakeryName: bakery.bakeryName,
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
      <View style={styles.container}>
        {searchValue && data ? (
          <SearchBakeryList bakeries={data} onPressReport={navigateReport} onPressBakery={onPressBakery} />
        ) : (
          <>
            <Text presets={['body1', 'bold']} style={styles.historyTitle}>
              최근검색
            </Text>
            <SearchHistoryList searchHistory={searchHistory} onPressBakery={onPressBakery} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  historyTitle: {
    color: theme.color.gray900,
    marginBottom: 16,
  },
});

export { Search };
