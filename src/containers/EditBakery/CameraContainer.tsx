import React, { useState, useRef, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-easy-toast';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { CameraComponent } from '@/components/EditBakery';
import { RootRouteProps } from '@/pages/MainStack/EditBakeryStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { phPathToFilePath } from '@/utils/phPathToFilePath';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useNavigation, useRoute } from '@react-navigation/native';

export function CameraContainer() {
  const {
    params: { bakeryId, NavigationKey },
  } = useRoute<RootRouteProps<'EditBakery'>>();
  const toast = useRef<Toast>(null);
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
    // ImageCropPicker.openPicker({
    //   width: 320,
    //   height: 280,
    //   cropping: true,
    // }).then(image => {
    //   setPhoto(image.path);
    // });
    navigation.push('EditBakeryStack', {
      screen: 'DeleteLocation',
      params: {
        type: 'Album',
        bakeryId: bakeryId,
        NavigationKey: NavigationKey,
      },
    });
  };

  const onCameraButtonClick = async () => {
    const data = await camera.current?.takePhoto({
      qualityPrioritization: Platform.OS === 'android' ? 'quality' : 'balanced',
    });

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
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

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
    if (Platform.OS === 'ios') {
      const result = await phPathToFilePath(data.edges[0].node.image.uri);
      setGalleryImage(result);
    } else {
      setGalleryImage(data.edges[0]?.node?.image?.uri);
    }
  };

  useEffect(() => {
    getPhotoWithPermission();
    // currentCameraPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (photo) {
      navigation.replace('EditBakeryStack', {
        screen: 'DeleteLocation',
        params: {
          type: 'Confirm',
          url: photo,
          bakeryId: bakeryId,
          NavigationKey: NavigationKey,
        },
      });
    }
  }, [photo, navigation, bakeryId, NavigationKey]);

  useEffect(() => {
    toast.current?.show('폐업전경 사진을 제출해주세요');
  }, []);

  return (
    <>
      {device && (
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
      )}
      <Toast ref={toast} position="top" />
    </>
  );
}
