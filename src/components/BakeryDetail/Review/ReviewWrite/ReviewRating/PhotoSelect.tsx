import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { ImageCloseIcon } from '@/components/Shared/Icons';
import { PhotoButton } from './PhotoButton';

type Props = {
  images: Asset[];
  onSelectPhotos: () => void;
  deSelectPhoto: (uri?: string) => void;
};

export const PhotoSelect = ({ images, onSelectPhotos, deSelectPhoto }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 업로드</Text>
      <View style={styles.uploadImageContainer}>
        <PhotoButton selectCount={images.length} onPress={onSelectPhotos} />
        <FlatList
          data={images}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageListContainer}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <>
                <Image style={styles.uploadImage} source={{ uri: item.uri }} />
                <TouchableOpacity style={styles.uploadImageCloseButton} onPress={() => deSelectPhoto(item.uri)}>
                  <ImageCloseIcon />
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    paddingLeft: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  uploadImageContainer: {
    flexDirection: 'row',
  },
  imageListContainer: {
    paddingTop: 12,
  },
  uploadImage: {
    width: 88,
    height: 88,
    borderRadius: 8,
    marginRight: 12,
  },
  uploadImageCloseButton: {
    position: 'absolute',
    right: 8,
    top: -4,
  },
});
