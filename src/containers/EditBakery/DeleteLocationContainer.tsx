import React, { useEffect, useRef, useState } from 'react';
import Config from 'react-native-config';
import Toast from 'react-native-easy-toast';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { updateBakery } from '@/apis/bakery';
import { DeleteLocationComponent } from '@/components/EditBakery';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/EditBakeryStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';

export function DeleteLocationContainer() {
  const {
    params: { type, url: curPhotoUrl, bakeryId, NavigationKey },
  } = useRoute<RootRouteProps<'DeleteLocation'>>();
  const { accessToken } = useAppSelector(state => state.auth);
  const toast = useRef<Toast>(null);
  const cancelBottomSheetRef = useRef<BottomSheet>();
  const EditDoneBottomSheetRef = useRef<BottomSheet>();
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const [curType, setCurType] = useState(type);
  const [curLocationUrl, setCurLocationUrl] = useState('');

  const onClickRight = () => {
    if (curType === 'Album') {
      navigation.pop();
    } else {
      cancelBottomSheetRef.current?.expand();
    }
  };

  const onSendDeleteClick = async () => {
    const base64 = await RNFS.readFile(curLocationUrl || curPhotoUrl + '', 'base64');
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
    const response = await updateBakery({
      accessToken: accessToken!!,
      bakeryId: bakeryId,
      content: 'delete',
      images: [JSON.parse(resp?.data)?.data?.imagePath + ''],
    });
    if (response.status === 201) {
      EditDoneBottomSheetRef.current?.expand();
    }
  };

  useEffect(() => {
    if (curLocationUrl) {
      setCurType('Confirm');
    }
  }, [curLocationUrl]);

  useEffect(() => {
    if (curType === 'Album') {
      toast.current?.show('폐업전경 사진을 제출해주세요');
    }
  }, [curType]);

  return (
    <>
      <DeleteLocationComponent
        onClickRight={onClickRight}
        curType={curType}
        setCurLocationUrl={setCurLocationUrl}
        curPhotoUrl={curPhotoUrl!!}
        curLocationUrl={curLocationUrl}
        cancelBottomSheetRef={cancelBottomSheetRef}
        onSendDeleteClick={onSendDeleteClick}
        EditDoneBottomSheetRef={EditDoneBottomSheetRef}
        bakeryId={bakeryId}
        NavigationKey={NavigationKey}
      />
      <Toast ref={toast} position="top" />
    </>
  );
}
