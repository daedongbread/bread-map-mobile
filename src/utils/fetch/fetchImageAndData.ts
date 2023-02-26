import { Platform } from 'react-native';
import { Asset } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import store from '@/slices';
import { Config } from '@/utils';

type Props = {
  url: string;
  images: Asset[];
  data: any;
  dataKey?: string;
  imagesKey?: string;
};

export const fetchImageAndData = async ({ url, images, data, dataKey = 'request', imagesKey = 'files' }: Props) => {
  const accessToken = store.getState().auth.accessToken;
  const URI = `${Config.API_URI}${url}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'multipart/form-data',
  };

  const body = [];

  body.push({
    name: dataKey,
    data: JSON.stringify(data),
    type: 'application/json',
  });

  if (images && images.length > 0) {
    images.forEach(image => {
      if (!image.uri) {
        return;
      }

      const replacedPath = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
      const wrappedImage = RNFetchBlob.wrap(decodeURIComponent(replacedPath));

      body.push({
        name: imagesKey,
        data: wrappedImage,
        type: image.type || 'image/png',
        filename: image.fileName,
      });
    });
  }

  const res = await RNFetchBlob.fetch('POST', URI, headers, body);

  if (!(res.respInfo.status >= 200 && res.respInfo.status < 300)) {
    throw res.data;
  }

  return res;
};
