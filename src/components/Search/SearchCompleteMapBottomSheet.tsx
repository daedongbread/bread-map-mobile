import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BakeryDTO, SearchType } from '@/apis/search';
import { BakeryCard } from '@/components/Search';
import { SortingButton } from '@/components/Search/SortingButton';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';

import { resizePixel } from '@/utils';

import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';

import ImageBread from '@shared/Icons/ImageBread.svg';
import { Text } from '@shared/Text';

type Props = Pick<BottomSheetProps, 'onChange'> & {
  onClickBakery: (bakery: BakeryDTO) => void;
  bakeries?: Array<BakeryDTO>;
  onPressIcon: (bakery: BakeryDTO) => void;
  hasSelected?: boolean;
  searchType: SearchType;
  onDistanceSortingPress: () => void;
  onPopularSortingPress: () => void;
};

export const SearchCompleteMapBottomSheet: React.FC<Props> = ({
  onClickBakery,
  bakeries = [],
  onPressIcon,
  hasSelected,
  searchType,
  onDistanceSortingPress,
  onPopularSortingPress,
}) => {
  const ref = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['35%', '60%'], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  const handleBottomSheetChange = (index: number) => {
    setBottomSheetIndex(index);
  };

  const renderItem = useCallback(
    ({ item }: { item: BakeryDTO }) => {
      return (
        <TouchableOpacity onPress={() => onClickBakery(item)}>
          <BakeryCard bakery={item} onPressIcon={onPressIcon} />
        </TouchableOpacity>
      );
    },
    [onClickBakery, onPressIcon]
  );

  const selectedItemId = hasSelected ? bakeries[0]?.bakeryId : null;

  useEffect(() => {
    if (selectedItemId) {
      ref.current?.snapToIndex(0);
    }
  }, [selectedItemId]);

  return (
    <BottomSheet
      ref={ref}
      style={styles.bottomSheetContainer}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      snapPoints={snapPoints}
      enableContentPanningGesture={bottomSheetIndex !== 1}
      onChange={handleBottomSheetChange}
    >
      <SafeAreaView style={[styles.contentsContainer]}>
        <View style={styles.title}>
          <Text presets={['heading2', 'bold']}>검색결과</Text>

          <View style={styles.buttonContainer}>
            <SortingButton text="거리순" isSelected={searchType === 'DISTANCE'} onPress={onDistanceSortingPress} />

            <SplitColumn width={10} />

            <SortingButton text="인기순" isSelected={searchType === 'POPULAR'} onPress={onPopularSortingPress} />
          </View>
        </View>

        <FlatList
          data={bakeries}
          renderItem={renderItem}
          scrollEnabled={bottomSheetIndex !== 0}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      </SafeAreaView>
    </BottomSheet>
  );
};

const ListEmptyComponent = () => {
  return (
    <View style={styles.listEmptyContainer}>
      <ImageBread />
      <View style={styles.listEmptyTextContainer}>
        <Text presets={['body2', 'semibold']} color={'gray500'} style={styles.listEmptyText}>
          검색결과가 없어요
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingHorizontal: resizePixel(20),
  },
  handleIndicatorStyle: {
    backgroundColor: theme.color.gray300,
  },
  contentsContainer: {
    flex: 1,
    height: '100%',
  },
  listEmptyContainer: {
    flex: 1,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyTextContainer: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyText: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
