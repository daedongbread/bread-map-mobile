import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { DimImage } from '@/components/DimImage/DimImage';
import { ImageSkeleton } from '../Loading';

type Props = Omit<FastImageProps, 'onLoadEnd' | 'source'> & {
  isDimmed?: boolean;
  isResizable?: boolean;
  width: number;
  height: number;
  resizedWidth?: number;
  resizedHeight?: number;
  source: {
    uri?: string | null | undefined;
  };
};

export const CustomImage = React.memo(
  ({
    isDimmed = false,
    isResizable = false,
    width,
    height,
    resizedWidth = 0,
    resizedHeight = 0,
    source,
    ...rest
  }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const query = `?w=${resizedWidth * 2}&h=${resizedHeight * 2}`;
    const uri = isResizable ? source.uri + query : source.uri;

    return (
      <React.Fragment>
        {uri && (
          <FastImage
            {...rest}
            source={{
              uri,
            }}
            style={StyleSheet.flatten([
              rest.style,
              isLoading && {
                opacity: 0,
              },
            ])}
            onLoadStart={() => {
              setIsLoading(true);
            }}
            onLoadEnd={() => {
              setIsLoading(false);
            }}
          />
        )}

        {!isLoading && isDimmed && <DimImage show={true} />}

        {isLoading && <ImageSkeleton width={width} height={height} style={rest.style} />}
      </React.Fragment>
    );
  }
);
