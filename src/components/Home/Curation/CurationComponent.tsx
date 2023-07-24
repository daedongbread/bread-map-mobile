import React from 'react';
import Carousel from 'react-native-snap-carousel';

export type CarouselItemType = {
  subtitle: string;
  title: string;
  source: any;
};

type Props = {
  carouselItems: Array<CarouselItemType>;
  renderItem: React.FC<{ item: CarouselItemType; index: number }>;
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
