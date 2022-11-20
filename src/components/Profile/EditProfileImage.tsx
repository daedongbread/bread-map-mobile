import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import IcCamera from '@/components/Shared/Icons/IcCamera.svg';
import { resizePixels } from '@/utils';

type Props = {
  onCameraClick: () => void;
  curImage: string;
};

export function EditProfileImage({ onCameraClick, curImage }: Props) {
  return (
    <View style={styles.Container}>
      <FastImage resizeMode="stretch" style={styles.Image} source={{ uri: curImage }} />
      <TouchableOpacity onPress={onCameraClick} style={styles.Button}>
        <IcCamera />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create(
  resizePixels({
    Container: {
      backgroundColor: '#eeeeee',
      width: 100,
      height: 100,
      borderRadius: 8,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      alignSelf: 'center',
    },
    Button: {
      width: 24,
      height: 24,
      backgroundColor: 'black',
      opacity: 0.8,
      borderRadius: 99,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 4,
      right: 4,
    },
    Image: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: 8,
      overflow: 'hidden',
    },
  })
);
