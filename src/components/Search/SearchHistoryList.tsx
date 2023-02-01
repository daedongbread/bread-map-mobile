import React, { memo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { SearchEntity } from '@/apis/bakery/types';
import { Divider } from '@/components/BakeryDetail/Divider';
import { HistoryItem } from '@/components/Search/HistoryItem';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';

const ItemSeparatorComponent: React.VFC = () => {
  return <Divider style={styles.divider} />;
};

type Props = {
  searchHistory: SearchEntity[];
  onPressBakery: (searchEntity: SearchEntity) => void;
};

const SearchHistoryList: React.FC<Props> = memo(({ searchHistory, onPressBakery }) => {
  const renderItem: ListRenderItem<SearchEntity> = ({ item }) => {
    const onPress = () => {
      onPressBakery(item);
    };

    return <HistoryItem name={item.bakeryName} onPress={onPress} />;
  };

  if (!searchHistory?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text presets={['body1', 'medium']} style={styles.emptyText}>
          최근검색 내역이 없습니다.
        </Text>
      </View>
    );
  }

  return <FlatList data={searchHistory} renderItem={renderItem} ItemSeparatorComponent={ItemSeparatorComponent} />;
});

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: theme.color.gray500,
  },
  divider: {
    height: 1,
  },
});

export { SearchHistoryList };
