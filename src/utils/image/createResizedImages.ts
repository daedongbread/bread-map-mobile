import { Asset } from 'react-native-image-picker';
import { PostImagesRequest } from '@/apis/image/usePostImages';
import ImageResizer, { ResizeFormat } from '@bam.tech/react-native-image-resizer';

export const createResizedImages = async ({ images, width, height, quality = 100 }: PostImagesRequest) => {
  let resizedImages: Asset[] = [];

  const resizeImages = images.map(async image => {
    const imageType = convertImageType('');

    const res = await ImageResizer.createResizedImage(
      image.uri || '',
      width,
      height,
      imageType,
      quality,
      0,
      undefined,
      false,
      {
        mode: 'stretch',
      }
    );

    resizedImages.push({
      uri: res.uri,
      type: image.type,
      fileName: image.fileName,
    });
  });

  await Promise.all(resizeImages);

  return resizedImages;
};

const convertImageType = (type: string) => {
  let resultType: ResizeFormat = 'JPEG';
  if (type === 'image/jpeg') {
    type = 'JPEG';
  } else if (type === 'image/png') {
    type = 'PNG';
  }

  return resultType;
};
