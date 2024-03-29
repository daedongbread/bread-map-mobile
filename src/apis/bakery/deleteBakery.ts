import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { Config } from '@/utils';

type Props = {
  accessToken: string;
  bakeryId: number;
  userImage: string;
};

type ArrProps = {
  filename: string;
  name: string;
  data: any;
  type: string;
}[];

const deleteBakery = async ({ accessToken, bakeryId, userImage }: Props) => {
  let arr: ArrProps = [];

  const base64 = await RNFS.readFile(userImage, 'base64');

  arr.push({
    name: 'file',
    data: base64,
    type: 'image/png',
    filename: JSON.stringify(new Date()),
  });

  const resp = await RNFetchBlob.fetch(
    'post',
    `${Config.API_URI}/bakery/report/${bakeryId}/delete`,
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
    arr
  );
  return resp;
};

export { deleteBakery };
