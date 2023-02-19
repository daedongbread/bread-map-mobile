import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { ImageCloseIcon } from '@/components/Shared/Icons';
import { PhotoButton } from './PhotoButton';

const { width } = Dimensions.get('window');

type Props = {
  images: Asset[];
  onSelectPhotos: () => void;
  deSelectPhoto: (uri?: string) => void;
};

export const PhotoSelect = ({ images, onSelectPhotos, deSelectPhoto }: Props) => {
  return (
    <View style={styles.container}>
      <PhotoButton selectCount={images.length} onPress={onSelectPhotos} />
      <FlatList
        data={images}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageListContainer}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <View>
              <Image style={styles.uploadImage} source={{ uri: item.uri }} />
              <TouchableOpacity style={styles.uploadImageCloseButton} onPress={() => deSelectPhoto(item.uri)}>
                <ImageCloseIcon />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageListContainer: {
    paddingTop: 12,
    paddingLeft: 20,
  },
  uploadImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 8,
    marginRight: 12,
  },
  uploadImageCloseButton: {
    position: 'absolute',
    right: 8,
    top: -4,
  },
});
