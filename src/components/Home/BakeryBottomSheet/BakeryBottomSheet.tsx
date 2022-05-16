import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { TabItem } from '@/containers/Home/BakeryBottomSheetContainer';

import { theme } from '@/styles/theme';

import { resizePixel } from '@/utils';

import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';

import { Header } from './Header';

type Props = Pick<BottomSheetProps, 'onChange'> & {
  onClickBakery: (id: string) => void;
  activeTab: TabItem;
  onPressTab: (item: TabItem) => void;
};

const BakeryBottomSheet: React.FC<Props> = ({ onChange, activeTab, onPressTab }) => {
  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);

  return (
    <BottomSheet
      style={styles.bottomSheetContainer}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      enableContentPanningGesture={false}
      snapPoints={snapPoints}
      onChange={onChange}
    >
      <SafeAreaView style={styles.contentsContainer}>
        <Header activeTab={activeTab} onPress={onPressTab} />
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
