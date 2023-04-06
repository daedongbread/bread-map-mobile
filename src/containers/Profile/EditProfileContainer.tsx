import { AxiosError } from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import Config from 'react-native-config';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFetchBlob, { FetchBlobResponse } from 'rn-fetch-blob';
import { fetcher } from '@/apis/fetcher';
import { EditProfileComponent } from '@/components/Profile';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export function EditProfileContainer() {
  const route = useRoute<RootRouteProps<'EditProfile'>>();
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const [name, setName] = useState(route.params?.nickName);
  const [curImage, setCurImage] = useState(route.params?.userImage);
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = useCallback(({ name: label, value }) => {
    const changeFunctions = {
      name: setName,
    };

    if (label in changeFunctions) {
      changeFunctions[label as keyof typeof changeFunctions](value);
    }
  }, []);

  const getAlbum = () => {
    ImageCropPicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(image => {
      setCurImage(image.path);
    });
  };
  const onConfirmClick = async () => {
    if (name.length === 0) {
      setErrorMsg('닉네임을 입력해주세요');
      return;
    }

    if (route.params?.nickName === name && curImage === route.params?.userImage) {
    } else {
      let imageResponse: FetchBlobResponse | null = null;
      let userImage = curImage;
      if (!curImage.startsWith('https://')) {
        const base64 = await RNFS.readFile(curImage, 'base64');
        imageResponse = await RNFetchBlob.fetch(
          'POST',
          `${Config.API_URI}/v1/images`,
          {
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
        userImage = JSON.parse(imageResponse?.data)?.data?.imagePath + '';
      }
      fetcher({
        method: 'post',
        url: '/v1/users/nickname',
        data: {
          nickName: name,
          image: userImage,
        },
      })
        .then(res => {
          if (res.status === 204) {
            navigation.pop();
          }
        })
        .catch((res: AxiosError) => {
          if (res?.response?.status === 409) {
            setErrorMsg('이미 존재하는 닉네임입니다');
          } else if (res?.response?.status === 400) {
            setErrorMsg('닉네임을 확인해주세요.');
          }
        });
    }
  };

  useEffect(() => {
    setErrorMsg('');
  }, [name]);

  return (
    <EditProfileComponent
      name={name}
      onChange={onChange}
      onCameraClick={getAlbum}
      curImage={curImage}
      onConfirmClick={onConfirmClick}
      errorMsg={errorMsg}
    />
  );
}
