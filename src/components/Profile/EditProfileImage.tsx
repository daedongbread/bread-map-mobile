import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import IcCamera from '@/components/Shared/Icons/IcCamera.svg';
import { getRandomImageUrl, resizePixels } from '@/utils';
import defaultProfile from '@shared/Images/defaultProfile.png';
import breadImage from '@shared/Images/bread.png';

type Props = {
  onCameraClick: () => void;
  curImage: string;
};

export function EditProfileImage({ onCameraClick, curImage }: Props) {
  return (
    <View style={styles.Container}>
      <View style={styles.Placeholder}>
        <ImageBackground source={defaultProfile} resizeMode="contain" style={styles.PlaceholderImage} />
      </View>
      <FastImage resizeMode="cover" style={styles.Image} source={{ uri: curImage }} />
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
      // justifyContent: 'flex-end',
      // alignItems: 'flex-end',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
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
      position: 'absolute',
    },
    Image: {
      borderRadius: 8,
      width: 100,
      height: 100,
    },
    Placeholder: {
      position: 'absolute',
      justifyContent: 'center',
    },
    PlaceholderImage: {
      width: 68,
      height: 65,
    },
  })
);
