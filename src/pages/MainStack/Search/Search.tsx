import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useSearchQuery } from '@/apis/bakery/useSearch';
import { SearchBakeryList } from '@/components/Search/SearchBakeryList';
import { SearchHistoryList } from '@/components/Search/SearchHistoryList';
import { useDebounce } from '@/hooks/useDebounce';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Header } from '@/pages/MainStack/Search/Header';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { storage } from '@/utils/storage/storage';
import { Text } from '@shared/Text';

type Props = MainStackScreenProps<'Search'>;

const Search: React.FC<Props> = ({ navigation }) => {
  const { currentPosition, getLocation } = useGeolocation();
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<Array<string>>([]);

  const word = useDebounce(searchValue, 300);

  const { data } = useSearchQuery({
    word,
    longitude: currentPosition?.longitude,
    latitude: currentPosition?.latitude,
  });

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.pop();
    }
  }, [navigation]);

  const navigateReport = useCallback(() => {
    navigation.push('ReportBakeryStack', {
      screen: 'ReportBakeryOnboard',
    });
  }, [navigation]);

  const navigateDetail = useCallback(
    (id: number) => {
      navigation.push('MainTab', {
        screen: 'HomeStack',
        params: {
          screen: 'Bakery',
          params: {
            screen: 'BakeryDetailHome',
            params: {
              bakeryId: id,
            },
          },
        },
      });
    },
    [navigation]
  );

  useEffect(() => {
    const getSearchHistory = async () => {
      const res = await storage.get('search');
      if (!res) {
        return;
      }

      return JSON.parse(res);
    };

    getSearchHistory().then(setSearchHistory);
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <SafeAreaView style={[styles.fullScreen]}>
      <Header value={searchValue} onChangeText={setSearchValue} onPress={goBack} />
      <View style={styles.container}>
        {data?.length ? (
          <SearchBakeryList bakeries={data} onPressReport={navigateReport} onPressBakery={navigateDetail} />
        ) : (
          <>
            <Text presets={['body1', 'bold']} style={styles.historyTitle}>
              최근검색
            </Text>
            <SearchHistoryList searchHistory={searchHistory} />
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
    marginBottom: 16,
  },
});

export { Search };
