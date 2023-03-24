import React, { useState, useCallback, useEffect } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { editNickName } from '@/apis/profile';
import { EditProfileComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

export function EditProfileContainer() {
  const route = useRoute<RootRouteProps<'EditProfile'>>();
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const { accessToken } = useAppSelector(state => state.auth);
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
      const response = await editNickName({
        accessToken: accessToken!!,
        nickName: name,
        userImage: curImage.startsWith('https://') ? '' : curImage,
      });

      if (response?.respInfo?.status === 204) {
        navigation.pop();
      } else if (response?.respInfo?.status === 409) {
        setErrorMsg('이미 존재하는 닉네임입니다');
      } else if (response?.respInfo?.status === 400) {
        setErrorMsg('한글, 영문, 숫자만 사용 가능합니다.');
      }
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
