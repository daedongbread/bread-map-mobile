import { AxiosError } from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { fetcher } from '@/apis/fetcher';
import { usePostImages } from '@/apis/image';
import { EditProfileComponent } from '@/components/Profile';
import { useAppDispatch } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { showToast } from '@/slices/toast';
import { useNavigation, useRoute } from '@react-navigation/native';

export function EditProfileContainer() {
  const dispatch = useAppDispatch();
  const route = useRoute<RootRouteProps<'EditProfile'>>();
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const [name, setName] = useState(route.params?.nickName);
  const [curImage, setCurImage] = useState(route.params?.userImage);
  const [errorMsg, setErrorMsg] = useState('');

  const { mutateAsync: postImages, isLoading: isImageSaving } = usePostImages();

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
      if (image.size > 10000000) {
        dispatch(
          showToast({
            text: '10mb 이하만 업로드 가능합니다',
            duration: 5 * 1000,
          })
        );
        return;
      }
      setCurImage(image.path);
    });
  };
  const onConfirmClick = async () => {
    if (isImageSaving) {
      return;
    }

    if (name.length === 0) {
      setErrorMsg('닉네임을 입력해주세요');
      return;
    }

    if (route.params?.nickName === name && curImage === route.params?.userImage) {
    } else {
      const imagePath = await postImages([
        {
          fileName: 'fileName',
          type: 'image/jpg',
          uri: curImage,
        },
      ]);

      fetcher({
        method: 'post',
        url: '/v1/users/nickname',
        data: {
          nickName: name,
          image: imagePath[0],
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
