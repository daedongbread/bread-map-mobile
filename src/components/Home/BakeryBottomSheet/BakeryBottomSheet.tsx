import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { BakeryEntity } from '@/apis';
import { BakeryCard } from '@/components/Home/BakeryCard';
import { TabItem } from '@/containers/Home/BakeryBottomSheetContainer';

import { theme } from '@/styles/theme';

import { resizePixel } from '@/utils';

import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';

import { Header } from './Header';

type Props = Pick<BottomSheetProps, 'onChange'> & {
  onClickBakery: (id: string) => void;
  activeTab: TabItem;
  onPressTab: (item: TabItem) => void;
  bakeryList: Array<BakeryEntity>;
};

const BakeryBottomSheet: React.FC<Props> = ({ bakeryList, activeTab, onPressTab }) => {
  const snapPoints = useMemo(() => ['35%', '60%'], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  const handleBottomSheetChange = (index: number) => {
    setBottomSheetIndex(index);
  };

  const renderItem = useCallback(({ item }: { item: BakeryEntity }) => {
    return <BakeryCard bakery={item} />;
  }, []);

  return (
    <BottomSheet
      style={styles.bottomSheetContainer}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      snapPoints={snapPoints}
      enableContentPanningGesture={bottomSheetIndex !== 1}
      onChange={handleBottomSheetChange}
    >
      <SafeAreaView style={[styles.contentsContainer]}>
        <Header activeTab={activeTab} onPress={onPressTab} />
        <FlatList data={bakeryList} renderItem={renderItem} />
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

export { BakeryBottomSheet };
