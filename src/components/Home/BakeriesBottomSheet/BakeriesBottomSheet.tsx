import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { BakeryCard } from '@/components/Home/BakeryCard';
import { TabItem } from '@/containers/Home/BakeryBottomSheetContainer';

import { theme } from '@/styles/theme';

import { resizePixel } from '@/utils';

import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';

import { Header } from './Header';

type Props = Pick<BottomSheetProps, 'onChange'> & {
  onClickBakery: (bakery: BakeryMapBakeryEntity) => void;
  activeTab: TabItem;
  onPressTab: (item: TabItem) => void;
  bakeryList?: Array<BakeryMapBakeryEntity>;
  onPressIcon: (bakery: BakeryMapBakeryEntity) => void;
  hasSelected?: boolean;
};

export const BakeriesBottomSheet: React.FC<Props> = ({
  onClickBakery,
  bakeryList = [],
  activeTab,
  onPressTab,
  onPressIcon,
  hasSelected,
}) => {
  const ref = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['35%', '60%'], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  const handleBottomSheetChange = (index: number) => {
    setBottomSheetIndex(index);
  };

  const renderItem = useCallback(
    ({ item }: { item: BakeryMapBakeryEntity }) => {
      return (
        <TouchableOpacity onPress={() => onClickBakery(item)}>
          <BakeryCard bakery={item} onPressIcon={onPressIcon} />
        </TouchableOpacity>
      );
    },
    [onClickBakery, onPressIcon]
  );

  const selectedItemId = hasSelected ? bakeryList[0]?.id : null;

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
        <Header activeTab={activeTab} onPress={onPressTab} />
        <FlatList
          data={bakeryList}
          renderItem={renderItem}
          scrollEnabled={bottomSheetIndex !== 0}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </BottomSheet>
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
  },
});
