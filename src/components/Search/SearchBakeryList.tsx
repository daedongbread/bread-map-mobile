import React, { memo, useCallback } from 'react';
import { ButtonProps, FlatList, FlatListProps, StyleSheet } from 'react-native';
import { Divider } from '@/components/BakeryDetail/Divider';
import { SearchedBakeryNotFound } from '@/components/Search/SearchedBakeryNotFound';
import { SearchItem } from '@/components/Search/SearchItem';

type Bakery = {
  id: number;
  name: string;
  reviews: Array<number>;
  distance: number;
};

const ItemSeparatorComponent: React.VFC = memo(() => {
  return <Divider style={styles.divide} />;
});

type Props = {
  bakeries: Array<Bakery>;
  onPressReport: ButtonProps['onPress'];
  onPressBakery: (id: number) => void;
};

const SearchBakeryList: React.FC<Props> = memo(({ bakeries, onPressBakery, onPressReport }) => {
  const renderItem: FlatListProps<Bakery>['renderItem'] = useCallback(
    ({ item }) => {
      const onPress = () => {
        onPressBakery(item.id);
      };
      return <SearchItem bakery={item} onPress={onPress} />;
    },
    [onPressBakery]
  );

  if (!bakeries.length) {
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
