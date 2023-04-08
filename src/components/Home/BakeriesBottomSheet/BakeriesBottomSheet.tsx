import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { BakeryCard } from '@/components/Home/BakeryCard';
import { TabItem } from '@/containers/Home/BakeryBottomSheetContainer';

import { theme } from '@/styles/theme';

import { resizePixel } from '@/utils';

import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';

import ImageBread from '@shared/Icons/ImageBread.svg';
import { Text } from '@shared/Text';
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
          해당 위치에 빵집이 없오요.{'\n'} 위치를 이동해보세요
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
});
