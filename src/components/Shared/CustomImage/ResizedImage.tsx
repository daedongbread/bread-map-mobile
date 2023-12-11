import React from 'react';
import { Image, ImageProps, ImageURISource } from 'react-native';

type Props = ImageProps & {
  width: number;
  height: number;
  source: ImageURISource;
};

export const ResizedImage = React.memo(({ width, height, ...rest }: Props) => {
  const source = rest.source;
  // 화질을 보존하기 위해 * 2
  const query = `?w=${width * 2}&h=${height * 2}`;
  const uri = source.uri + query;

  source.uri = uri;

  return <Image {...rest} source={source} />;
});
