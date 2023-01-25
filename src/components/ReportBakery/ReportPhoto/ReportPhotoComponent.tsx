import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Shared/Header';

export const ReportPhotoComponent = () => {
  return (
    <SafeAreaView>
      <Header isCloseButtonShown />
    </SafeAreaView>
  );
};
