import React, { useState, useRef, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { CameraComponent } from '@/components/EditBakery';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useNavigation } from '@react-navigation/native';

export function CameraContainer() {
  const camera = useRef<Camera>(null);
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const devices = useCameraDevices();
  const device = devices.back;
  const [photo, setPhoto] = useState('');
  const [isCameraClick, setIsCameraClick] = useState(false);
  const [tmpPhoto, setTmpPhoto] = useState('');
  const [galleryImage, setGalleryImage] = useState('');

  const currentCameraPermission = async () => {
    await Camera.requestCameraPermission();
  };

  const onCloseClick = () => {
    navigation.pop();
  };

  const getAlbum = () => {
    ImageCropPicker.openPicker({
      width: 320,
      height: 280,
      cropping: true,
    }).then(image => {
      setPhoto(image.path);
    });
  };

  const onCameraButtonClick = async () => {
    const data = await camera.current?.takePhoto({
      qualityPrioritization: 'quality',
    });
    // console.log(data?.path);

    const image = await ImageCropPicker.openCropper({
      path: `file://${data?.path}`,
      width: 320,
      height: 280,
      cropperToolbarTitle: '사진 수정',
      mediaType: 'photo',
    });

    setIsCameraClick(true);
    setTmpPhoto(image.path || '');
  };

  const onUseImageClick = () => {
    setPhoto(tmpPhoto);
  };

  const onRetakePhoto = () => {
    setIsCameraClick(false);
    setTmpPhoto('');
  };

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const getPhotoWithPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    getPhotos();
  };

  const getPhotos = async () => {
    const data = await CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    });
    // eslint-disable-next-line no-console
    console.log(data);
    setGalleryImage(data.edges[0]?.node?.image?.uri);
  };
  useEffect(() => {
    getPhotoWithPermission();
    currentCameraPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (photo) {
      navigation.replace('EditBakeryStack', {
        screen: 'DeleteLocation',
        params: {
          type: 'Confirm',
          url: photo,
        },
      });
    }
  }, [photo, navigation]);

  return (
    <CameraComponent
      getAlbum={getAlbum}
      onCameraButtonClick={onCameraButtonClick}
      camera={camera}
      onCloseClick={onCloseClick}
      device={device}
      isCameraClick={isCameraClick}
      onRetakePhoto={onRetakePhoto}
      onUseImageClick={onUseImageClick}
      tmpPhoto={tmpPhoto}
      galleryImage={galleryImage}
    />
  );
}
