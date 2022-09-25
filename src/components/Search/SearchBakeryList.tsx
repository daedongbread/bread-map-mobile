import React, { memo, useCallback } from 'react';
import { ButtonProps, FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { SearchEntity } from '@/apis/bakery/types';
import { Divider } from '@/components/BakeryDetail/Divider';
import { SearchedBakeryNotFound } from '@/components/Search/SearchedBakeryNotFound';
import { SearchItem } from '@/components/Search/SearchItem';

const ItemSeparatorComponent: React.VFC = memo(() => {
  return <Divider style={styles.divide} />;
});

type Props = {
  bakeries?: Array<SearchEntity>;
  onPressReport: ButtonProps['onPress'];
  onPressBakery: (searchEntity: SearchEntity) => void;
};

const SearchBakeryList: React.FC<Props> = memo(({ bakeries, onPressBakery, onPressReport }) => {
  const renderItem: ListRenderItem<SearchEntity> = useCallback(
    ({ item }) => {
      const onPress = () => {
        onPressBakery(item);
      };

      return <SearchItem bakery={item} onPress={onPress} />;
    },
    [onPressBakery]
  );

  if (bakeries?.length === 0) {
    return <SearchedBakeryNotFound onPress={onPressReport} />;
  }

  return <FlatList data={bakeries} renderItem={renderItem} ItemSeparatorComponent={ItemSeparatorComponent} />;
});

const styles = StyleSheet.create({
  divide: {
    height: 1,
  },
});

export { SearchBakeryList };
