import * as RNFS from 'react-native-fs';
import { Asset } from 'react-native-image-picker';
import { useMutation, useQueryClient } from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';
import { useAppSelector } from '@/hooks/redux';
type BakeryBreadReport = {
  name: string;
  price: number;
};
//TODO RNFetchBlob 이용해서 post 요청 보내기
export const postBakeryBreadReport = (bakeryId: number, accessToken: any) => {
  return (data: { request: BakeryBreadReport; files: Asset[] }) => {
    return RNFetchBlob.fetch(
      'post',
      `/bakery/report/${bakeryId}`,
      {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'request',
          data: RNFetchBlob.wrap(JSON.stringify(data.request)),
          type: 'application/json',
        },
        ...data.files.map(async file => {
          const base64 = await RNFS.readFile(file.uri!, 'base64');
          return {
            name: 'file',
            data: base64,
            type: 'image/png',
            filename: file.fileName,
          };
        }),
      ]
    );
  };
};

const useBakeryBreadReportMutate = (bakeryId: number) => {
  const accessToken = useAppSelector(selector => selector.auth.accessToken);
  const queryClient = useQueryClient();
  const mutate = postBakeryBreadReport(bakeryId, accessToken);
  return useMutation(mutate, {
    onSuccess: () => {
      queryClient.invalidateQueries('bakeryBreadReport');
    },
  });
};

export { useBakeryBreadReportMutate };
