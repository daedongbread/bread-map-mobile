import React from 'react';
import { Image, ImageProps, ImageURISource } from 'react-native';

type Props = ImageProps & {
  width: number;
  height: number;
  source: ImageURISource;
};

export const ResizedImage = React.memo(({ width, height, ...rest }: Props) => {
  const source = rest.source;
  const query = `?w=${width}&h=${height}`;
  const uri = source.uri + query;

  source.uri = uri;

  return <Image {...rest} source={source} />;
});
