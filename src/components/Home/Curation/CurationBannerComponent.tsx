import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Banners } from './Banners';
import { Indicators } from './Indicators';

type Props = {
  images: string[];
  totalIndex: number;
  currentIndex: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export const CurationBannerComponent = ({ images, totalIndex, currentIndex, onScroll }: Props) => {
  return (
    <View>
      <Banners images={images} onScroll={onScroll} />
      <SplitRow height={8} />
      <Indicators totalIndex={totalIndex} currentIndex={currentIndex} />
    </View>
  );
};
