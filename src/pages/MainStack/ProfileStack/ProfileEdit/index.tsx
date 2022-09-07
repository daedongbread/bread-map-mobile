import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Camera, DefaultProfile } from '@shared/Icons';

const ProfileEdit = () => {
  const [imageUri, setImageUri] = useState<string>();

  const showImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        presentationStyle: 'pageSheet',
        quality: 1,
      },
      response => {
        if (response.assets && response.assets[0].uri) {
          const uri = response.assets[0].uri;
          setImageUri(uri);
        }
      }
    ).catch(() => {
      Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
      setImageUri(undefined);
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.layout}>
        <TouchableOpacity onPress={() => showImagePicker()}>
          <View style={styles.profileImage}>
            {imageUri !== undefined ? <Image source={{ uri: imageUri }} /> : <DefaultProfile />}
            <View style={styles.cameraIconWrapperStyle}>
              <Camera />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 24,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  profileImage: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cameraIconWrapperStyle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'black',
    width: 24,
    height: 24,
    bottom: 4,
    right: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ProfileEdit };
