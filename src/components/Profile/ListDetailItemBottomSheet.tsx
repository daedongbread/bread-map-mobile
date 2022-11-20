import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { resizePixels } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { BackdropComponent } from './BackdropComponent';

export function ListDetailItemBottomSheet({ bottomSheetRef }: any) {
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <BottomSheet
      backdropComponent={BackdropComponent}
      enablePanDownToClose
      // eslint-disable-next-line react-native/no-inline-styles
      handleIndicatorStyle={{ backgroundColor: '#E0E0E0' }}
      index={-1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'pink',
    },
  })
);
