import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { FeedEntity } from '@/apis/feed/types';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Banners } from './Banners';
import { Indicators } from './Indicators';

type Props = {
  feeds: FeedEntity[];
  totalIndex: number;
  currentIndex: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onPressBanner: (feedId: number) => void;
};

export const CurationBannerComponent = ({ feeds, totalIndex, currentIndex, onScroll, onPressBanner }: Props) => {
  return (
    <View>
      <Banners feeds={feeds} onScroll={onScroll} onPressBanner={onPressBanner} />
      <SplitRow height={8} />
      <Indicators totalIndex={totalIndex} currentIndex={currentIndex} />
    </View>
  );
};
