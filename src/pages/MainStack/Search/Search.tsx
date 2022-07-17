import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SearchBakeryList } from '@/components/Search/SearchBakeryList';
import { SearchHistoryList } from '@/components/Search/SearchHistoryList';
import { Header } from '@/pages/MainStack/Search/Header';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { bakeryInfo, bakeryMenu, bakeryReviews } from '@/utils';
import { storage } from '@/utils/storage/storage';
import { Text } from '@shared/Text';

const INITIAL_BAKERY_LIST = [
  { name: '파리바게뜨 평택합정점', distance: 86, reviews: [1, 2, 3, 4, 5] },
  { name: '파리바게뜨 평택비전점', distance: 655, reviews: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
  { name: '파리바게뜨 평택용죽점', distance: 788, reviews: [1] },
  { name: '파리바게뜨 소사벌상업지구점', distance: 1200, reviews: [1, 2, 3, 4, 5] },
  { name: '파리바게뜨 평택현촌', distance: 11600, reviews: [1, 2, 3, 4, 5] },
];

type Props = MainStackScreenProps<'Search'>;

const Search: React.FC<Props> = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<Array<string>>([]);
  const [bakeryList, setBakeryList] = useState<
    Array<{
      name: string;
      reviews: Array<number>;
      distance: number;
    }>
  >(INITIAL_BAKERY_LIST);

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

  const navigateDetail = useCallback(() => {
    navigation.push('MainTab', {
      screen: 'HomeStack',
      params: {
        screen: 'Bakery',
        params: {
          screen: 'BakeryDetailHome',
          params: {
            bakeryInfo,
            bakeryMenu,
            bakeryReviews,
          },
        },
      },
    });
  }, [navigation]);

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

  return (
    <SafeAreaView style={[styles.fullScreen]}>
      <Header value={searchValue} onChangeText={setSearchValue} onPress={goBack} />
      <View style={styles.container}>
        {bakeryList ? (
          <SearchBakeryList bakeries={bakeryList} onPressReport={navigateReport} onPressBakery={navigateDetail} />
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
