import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { FastImageProps } from 'react-native-fast-image';
import { DimImage } from '@/components/DimImage/DimImage';
import { ImageSkeleton } from '../Loading';

type Props = Omit<FastImageProps, 'onLoadEnd'> & {
  isDimmed?: boolean;
};

export const CustomImage = React.memo(({ isDimmed = false, ...rest }: Props) => {
  const [isLoadEnd, setIsLoadEnd] = useState(false);

  return (
    <React.Fragment>
      <FastImage {...rest} style={isLoadEnd && rest.style} onLoadEnd={() => setIsLoadEnd(true)} />
      {isLoadEnd && isDimmed && <DimImage show={true} />}

      {!isLoadEnd && <ImageSkeleton style={rest.style} />}
    </React.Fragment>
  );
});
