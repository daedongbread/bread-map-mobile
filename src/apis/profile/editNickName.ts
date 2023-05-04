import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { Config } from '@/utils';

type Props = {
  accessToken: string;
  nickName: string;
  userImage: string;
};

type ArrProps = {
  filename?: string;
  name: string;
  data: any;
  type?: string;
}[];

const editNickName = async ({ accessToken, nickName, userImage }: Props) => {
  let arr: ArrProps = [
    {
      name: 'nickName',
      data: nickName,
    },
  ];

  if (userImage) {
    const base64 = await RNFS.readFile(userImage, 'base64');
    const resp = await RNFetchBlob.fetch(
      'POST',
      `${Config.API_URI}/v1/images`,
      {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          data: base64,
          type: 'image/png',
          filename: JSON.stringify(new Date()),
        },
      ]
    );

    arr.push({
      name: 'image',
      data: JSON.parse(resp?.data)?.data?.imagePath + '',
    });
  }

  const resp = await RNFetchBlob.fetch(
    'post',
    `${Config.API_URI}/v1/users/nickname`,
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    arr
  );

  return resp;
};

export { editNickName };
