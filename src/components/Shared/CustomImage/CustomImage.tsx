import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { FastImageProps } from 'react-native-fast-image';
import { DimImage } from '@/components/DimImage/DimImage';
import { ImageSkeleton } from '../Loading';

type Props = Omit<FastImageProps, 'onLoadEnd' | 'source'> & {
  isDimmed?: boolean;
  width: number;
  height?: number;
  source: {
    uri?: string | null | undefined;
  };
};

export const CustomImage = React.memo(({ isDimmed = false, width, height, source, ...rest }: Props) => {
  const [isLoadEnd, setIsLoadEnd] = useState(false);

  return (
    <React.Fragment>
      {source.uri && (
        <FastImage
          {...rest}
          source={{
            uri: source.uri,
          }}
          style={isLoadEnd && rest.style}
          onLoadEnd={() => setIsLoadEnd(true)}
        />
      )}

      {isLoadEnd && isDimmed && <DimImage show={true} />}

      {!isLoadEnd && <ImageSkeleton width={width} height={height} style={rest.style} />}
    </React.Fragment>
  );
});
