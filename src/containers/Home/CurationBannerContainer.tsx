import React, { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { CurationBannerComponent } from '@/components/Home/Curation/CurationBannerComponent';

type Props = {};

export const CurationBannerContainer = ({}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://d1xlkuuxh58wex.cloudfront.net/images/e4b04773a1a102d61acccbf71cd9f7d3.png',
    'https://d1xlkuuxh58wex.cloudfront.net/images/b40caec5ac407ca02eb63ae63040b2c7.png',
    'https://d1xlkuuxh58wex.cloudfront.net/images/144b85612c055e7ab030925c2ddac775.png',
    'https://d1xlkuuxh58wex.cloudfront.net/images/e4b04773a1a102d61acccbf71cd9f7d3.png',
    'https://d1xlkuuxh58wex.cloudfront.net/images/b40caec5ac407ca02eb63ae63040b2c7.png',
    'https://d1xlkuuxh58wex.cloudfront.net/images/144b85612c055e7ab030925c2ddac775.png',
  ];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(xPosition / totalWidth);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <CurationBannerComponent
      images={images}
      totalIndex={images.length}
      currentIndex={currentIndex}
      onScroll={onScroll}
    />
  );
};
