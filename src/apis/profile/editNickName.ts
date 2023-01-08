import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

type Props = {
  accessToken: string;
  nickName: string;
  userImage: string;
};

type ArrProps = {
  filename?: string;
  name: string;
  data: any;
  type: string;
}[];

const editNickName = async ({ accessToken, nickName, userImage }: Props) => {
  let arr: ArrProps = [
    {
      name: 'request',
      data: JSON.stringify({
        nickName: nickName,
      }),
      type: 'application/json',
    },
  ];
  if (userImage) {
    const base64 = await RNFS.readFile(userImage, 'base64');

    arr.push({
      name: 'file',
      data: base64,
      type: 'image/png',
      filename: JSON.stringify(new Date()),
    });
  }

  const resp = await RNFetchBlob.fetch(
    'post',
    'http://13.125.60.187/user/nickname',
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
    arr
  );

  return resp;
};

export { editNickName };
