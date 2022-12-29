import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Camera, CameraDevice } from 'react-native-vision-camera';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import IcCameraButton from '@shared/Icons/IcCameraButton.svg';
import IcMinusCircle from '@shared/Icons/IcMinusCircle.svg';
import { CloseIcon } from '../Shared/Icons';
import { Text } from '../Shared/Text';

type Props = {
  getAlbum: () => void;
  onCameraButtonClick: () => void;
  camera: any;
  onCloseClick: () => void;
  device: CameraDevice | undefined;
  isCameraClick: boolean;
  onUseImageClick: () => void;
  onRetakePhoto: () => void;
  tmpPhoto: string;
  galleryImage: string;
};

export function CameraComponent({
  getAlbum,
  onCameraButtonClick,
  camera,
  onCloseClick,
  device,
  isCameraClick,
  onUseImageClick,
  onRetakePhoto,
  tmpPhoto,
  galleryImage,
}: Props) {
  return (
    <View style={styles.Container}>
      {device && (
        <Camera ref={camera} photo={true} style={StyleSheet.absoluteFill} device={device} isActive={!isCameraClick} />
      )}
      {isCameraClick && <View style={styles.ResultBackground} />}
      <TouchableOpacity onPress={onCloseClick} style={styles.Header}>
        <CloseIcon width={32} height={32} style={styles.Icon} />
      </TouchableOpacity>
      {isCameraClick ? (
        <View style={styles.ResultContainer}>
          <FastImage style={styles.ResultImage} source={{ uri: tmpPhoto }} />
          <View style={styles.ResultWrap}>
            <TouchableOpacity onPress={onRetakePhoto}>
              <Text presets={['body2', 'medium']} style={styles.ResultText}>
                다시 찍기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onUseImageClick}>
              <Text presets={['body2', 'medium']} style={styles.ResultText}>
                사진 사용
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.Bottom}>
          <TouchableOpacity onPress={getAlbum} style={styles.AlbumWrap}>
            <FastImage style={styles.AlbumImage} source={{ uri: galleryImage }} resizeMode="cover" />
            <View style={styles.IcMinusCircle}>
              <IcMinusCircle />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCameraButtonClick} style={styles.CameraButton}>
            <IcCameraButton />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      flex: 1,
    },
    Header: {
      marginTop: 40,
      height: 32,
      width: '100%',
      backgroundColor: 'inherit',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    Icon: {
      marginRight: 16,
    },
    Bottom: {
      height: 80,
      width: '100%',
      marginTop: 'auto',
      marginBottom: 50,
      justifyContent: 'center',
    },
    CameraButton: {
      position: 'absolute',
      alignSelf: 'center',
    },
    Camera: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    AlbumWrap: {
      width: 40,
      height: 40,
      marginLeft: 30,
      borderRadius: 8,
      backgroundColor: 'white',
    },
    AlbumImage: {
      width: 40,
      height: 40,
      borderRadius: 8,
    },
    ResultContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 133,
    },
    ResultWrap: {
      width: '100%',
      height: 133,
      backgroundColor: theme.color.gray800,
      bottom: 0,
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 'auto',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    ResultBackground: {
      backgroundColor: 'black',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    ResultText: {
      color: 'white',
    },
    ResultImage: {
      width: 320,
      height: 280,
    },
    IcMinusCircle: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: -10,
      right: -10,
    },
  })
);
