import React, { memo, useCallback } from 'react';
import { ButtonProps, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { BakeryDTO, SearchType } from '@/apis/search';
import { Divider } from '@/components/BakeryDetail/Divider';
import { SearchedBakeryNotFound } from '@/components/Search/SearchedBakeryNotFound';
import { SearchItem } from '@/components/Search/SearchItem';
import { SortingButton } from '@/components/Search/SortingButton';
import { SplitColumn } from '@/components/Shared/SplitSpace';

const ItemSeparatorComponent: React.VFC = memo(() => {
  return <Divider style={styles.divide} />;
});

type Props = {
  bakeries?: Array<BakeryDTO>;
  keyword: string;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
  onPressReport: ButtonProps['onPress'];
  onPressBakery: (bakery: BakeryDTO) => void;
};

const SearchBakeryList: React.FC<Props> = memo(
  ({ bakeries, keyword, searchType, setSearchType, onPressBakery, onPressReport }) => {
    const onDistanceSortingPress = () => {
      setSearchType('DISTANCE');
    };

    const onPopularSortingPress = () => {
      setSearchType('POPULAR');
    };

    const renderItem: ListRenderItem<BakeryDTO> = useCallback(
      ({ item }) => {
        const onPress = () => {
          onPressBakery(item);
        };

        return <SearchItem bakery={item} onPress={onPress} />;
      },
      [onPressBakery]
    );

    if (bakeries?.length === 0) {
      return <SearchedBakeryNotFound onPress={onPressReport} keyword={keyword} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <SortingButton text="거리순" isSelected={searchType === 'DISTANCE'} onPress={onDistanceSortingPress} />

          <SplitColumn width={10} />

          <SortingButton text="인기순" isSelected={searchType === 'POPULAR'} onPress={onPopularSortingPress} />
        </View>
        <FlatList data={bakeries} renderItem={renderItem} ItemSeparatorComponent={ItemSeparatorComponent} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divide: {
    height: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export { SearchBakeryList };
