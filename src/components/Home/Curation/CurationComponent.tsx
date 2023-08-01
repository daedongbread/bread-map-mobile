import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { FeedEntity } from '@/apis/feed/types';

type Props = {
  carouselItems: Array<FeedEntity>;
  renderItem: React.FC<{ item: FeedEntity; index: number }>;
  sliderWidth: number;
  itemWidth: number;
  itemHeight: number;
  onSnapToItem: (index: number) => void;
  decelerationRate: number;
  enableMomentum: boolean;
};

export const CurationComponent: React.FC<Props> = ({
  carouselItems,
  renderItem,
  sliderWidth,
  itemWidth,
  itemHeight,
  onSnapToItem,
  decelerationRate,
  enableMomentum,
}) => {
  return (
    <Carousel
      // autoplay={true}
      // loop={true}
      data={carouselItems}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      onSnapToItem={onSnapToItem}
      decelerationRate={decelerationRate}
      enableMomentum={enableMomentum}
    />
  );
};
