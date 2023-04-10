import { Asset } from 'react-native-image-picker';
import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

type ImagesRes = {
  data: {
    imagePath: string;
  }[];
};

const postImages = async (images: Asset[]) => {
  const formData = new FormData();

  images.forEach(image => {
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
