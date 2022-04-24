import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { LogOutButton } from '@/components/Auth';
import { Example } from '@/components/Home/Example';
import { theme } from '@/styles/theme';
import { bindHook, resizePixel } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMapButtonSheet } from './useMapBottomSheet';

const MapBottomSheet = bindHook(useMapButtonSheet, ({ bottomSheetRef, snapPoints, handleSheetChanges }) => (
  <BottomSheet
    handleIndicatorStyle={styles.handleIndicatorStyle}
    style={styles.bottomSheetContainer}
    ref={bottomSheetRef}
    enableContentPanningGesture={false}
    snapPoints={snapPoints}
    onChange={handleSheetChanges}
  >
    <LogOutButton />
    <SafeAreaView style={styles.contentsContainer}>
      <Example />
    </SafeAreaView>
  </BottomSheet>
));

export { MapBottomSheet };

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingLeft: resizePixel(20),
  },
  handleIndicatorStyle: {
    backgroundColor: theme.color.gray300,
  },
  contentsContainer: {
    flex: 1,
  },
});
