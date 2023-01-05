import React, { useState, useCallback, useEffect } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { EditProfileComponent } from '@/components/Profile';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { editNickName } from '@/apis/profile';
import { useAppSelector } from '@/hooks/redux';
import { Alert } from 'react-native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';

export function EditProfileContainer() {
  const {
    params: { nickName, userImage },
  } = useRoute<RootRouteProps<'EditProfile'>>();
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const { accessToken } = useAppSelector(state => state.auth);
  const [name, setName] = useState(nickName);
  const [curImage, setCurImage] = useState(userImage);
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
    console.log('name: ' + name + ' ,curImage: ' + curImage);
    if (name.length === 0) {
      setErrorMsg('닉네임을 입력해주세요');
      return;
    }

    if (nickName === name && curImage === userImage) {
      console.log('변경없음');
    } else {
      const response = await editNickName({
        accessToken: accessToken!!,
        nickName: name,
        userImage: curImage.startsWith('https://') ? '' : curImage,
      });
      console.log(response);
      if (response?.respInfo?.status === 204) {
        navigation.pop();
      } else if (response?.respInfo?.status === 409) {
        setErrorMsg('이미 존재하는 닉네임입니다');
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
