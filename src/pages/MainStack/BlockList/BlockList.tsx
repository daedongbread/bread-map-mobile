import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { BlockListContainer } from '@/containers/BlockList/BlockListContainer';
import { BlockListHeader } from '@/pages/MainStack/BlockList/StackHeader';
import { UnblockUserBottomSheetContainer } from '@/pages/MainStack/BlockList/UnblockUserBottomSheetContainer';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
export const BlockList = () => {
  const { params } = useRoute<MainStackScreenProps<'BlockListModal'>['route']>();
  const userId = params?.blockUserId;

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.flex}>
        <BlockListHeader />
        <BlockListContainer />
        <UnblockUserBottomSheetContainer userId={userId} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
