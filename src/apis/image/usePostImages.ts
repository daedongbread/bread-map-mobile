import { Asset } from 'react-native-image-picker';
import { useMutation } from 'react-query';
import { createResizedImages } from '@/utils/image/createResizedImages';
import { fetcher } from '../fetcher';

export type PostImagesRequest = {
  images: Asset[];
  width: number;
  height: number;
  quality?: number;
};

type ImagesRes = {
  data: {
    imagePath: string;
  }[];
};

const postImages = async ({ images, width, height, quality }: PostImagesRequest) => {
  const formData = new FormData();

  let resizedImages: Asset[] = await createResizedImages({
    images,
    width,
    height,
    quality,
  });

  resizedImages.forEach(image => {
    const form = {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    };

    formData.append('images', form);
  });

  const res = await fetcher.post<ImagesRes>('/v1/images/multi', formData, {
    headers: { 'content-type': 'multipart/form-data' },
    transformRequest: _data => _data,
  });

  const formattedImages = res.data.data.map(item => item.imagePath);

  return formattedImages;
};

export const usePostImages = () => {
  return useMutation({
    mutationFn: postImages,
  });
};
