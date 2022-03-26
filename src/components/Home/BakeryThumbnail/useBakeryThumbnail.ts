import { useState } from 'react';
import { Config } from '@/utils';
import thumbnail from '@shared/Images/thumbnail.png';

type UseBakeryThumbnailProps = {
  src: string;
};

export const useBakeryThumbnail = ({ src }: UseBakeryThumbnailProps) => {
  const [source, setSource] = useState({ uri: Config.S3_URI + src });

  const onError = () => {
    setSource(thumbnail);
  };

  return {
    source,
    onError,
  };
};
