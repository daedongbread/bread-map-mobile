import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SearchBakeryList } from '@/components/Search/SearchBakeryList';
import { SearchHistoryList } from '@/components/Search/SearchHistoryList';
import { Header } from '@/pages/MainStack/Search/Header';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { storage } from '@/utils/storage/storage';
import { Text } from '@shared/Text';

type Props = MainStackScreenProps<'Search'>;

const Search: React.FC<Props> = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<Array<string>>([]);
  const [bakeryList, setBakeryList] = useState();

  const onPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.pop();
    }
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
      <Header value={searchValue} onChangeText={setSearchValue} onPress={onPress} />
      <View style={styles.container}>
        {bakeryList ? (
          <SearchBakeryList bakeries={bakeryList} />
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
