import React, { useState } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { DimImage } from '@/components/DimImage/DimImage';
import { ImageSkeleton } from '../Loading';

type Props = Omit<FastImageProps, 'onLoadEnd' | 'source'> & {
  isDimmed?: boolean;
  isResizable?: boolean;
  width: number;
  height: number;
  source: {
    uri?: string | null | undefined;
  };
};

export const CustomImage = React.memo(
  ({ isDimmed = false, isResizable = false, width, height, source, ...rest }: Props) => {
    const [isLoadEnd, setIsLoadEnd] = useState(true);
    const query = `?w=${width * 2}&h=${height * 2}`;
    const uri = isResizable ? source.uri + query : source.uri;

    return (
      <React.Fragment>
        {uri && (
          <FastImage
            {...rest}
            source={{
              uri,
            }}
            style={isLoadEnd && rest.style}
            onLoadStart={() => setIsLoadEnd(false)}
            onLoadEnd={() => {
              setIsLoadEnd(true);
            }}
          />
        )}

        {isLoadEnd && isDimmed && <DimImage show={true} />}

        {!isLoadEnd && <ImageSkeleton width={width} height={height} style={rest.style} />}
      </React.Fragment>
    );
  }
);
