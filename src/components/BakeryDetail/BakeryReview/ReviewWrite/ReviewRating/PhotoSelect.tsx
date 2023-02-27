import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { ImageCloseIcon } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { PhotoButton } from './PhotoButton';

const { width } = Dimensions.get('window');

type Props = {
  images: Asset[];
  onSelectPhotos: () => void;
  deSelectPhoto: (uri?: string) => void;
};

const Spacer = () => <SplitColumn width={12} />;

export const PhotoSelect = ({ images, onSelectPhotos, deSelectPhoto }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        contentContainerStyle={styles.imageListContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        ListHeaderComponent={<PhotoButton selectCount={images.length} onPress={onSelectPhotos} />}
        ListHeaderComponentStyle={styles.photoButton}
        ItemSeparatorComponent={Spacer}
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
    paddingHorizontal: 20,
  },
  photoButton: {
    marginRight: 12,
  },
  uploadImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 8,
  },
  uploadImageCloseButton: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
});
