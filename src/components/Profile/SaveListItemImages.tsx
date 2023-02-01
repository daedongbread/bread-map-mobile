import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import SadBreadGray from '@shared/Images/sadBreadGray.png';
import { Text } from '../Shared/Text';

export function SaveListItemImages({ num, images }: { num: number; images: any }) {
  const opacity = num > 3 ? 0.4 : 1;

  return (
    <View style={styles.Container}>
      {num === 0 ? (
        <View style={styles.NoWrap}>
          <FastImage style={styles.NoImage} source={SadBreadGray} resizeMode="contain" />
          <Text style={styles.NoTitle} presets={['caption1', 'medium']}>
            저장한 빵집이 없어요
          </Text>
        </View>
      ) : num === 1 ? (
        <FastImage source={{ uri: images[0] }} style={styles.FullImage} />
      ) : num === 2 ? (
        <View style={styles.ImageWrap}>
          <View style={styles.FirstImage}>
            <FastImage source={{ uri: images[0] }} style={styles.FullImage} />
          </View>
          <View>
            <View style={styles.SecondImage}>
              <FastImage source={{ uri: images[1] }} style={styles.FullImage} />
            </View>
            <View style={styles.ThirdImage} />
          </View>
        </View>
      ) : (
        <View style={styles.ImageWrap}>
          <View style={styles.FirstImage}>
            <FastImage source={{ uri: images[0] }} style={styles.FullImage} />
          </View>
          <View>
            <View style={styles.SecondImage}>
              <FastImage source={{ uri: images[1] }} style={styles.FullImage} />
            </View>
            <View style={styles.ThirdImage}>
              <FastImage source={{ uri: images[2] }} style={[styles.FullImage, { opacity }]} />
              {num > 3 && (
                <View style={styles.ImagesNumWrap}>
                  <Text style={styles.ImagesNumText}>+{num - 3}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create(
  resizePixels({
    Container: {
      width: 152,
      borderRadius: 16,
      flex: 1,
      overflow: 'hidden',
    },
    NoWrap: {
      backgroundColor: theme.color.gray100,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    NoImage: {
      width: 60,
      height: 34,
    },
    NoTitle: {
      color: theme.color.gray500,
      marginTop: 12,
    },
    ImageWrap: {
      flexDirection: 'row',
    },
    FullImage: {
      flex: 1,
    },
    FirstImage: {
      width: 93,
      height: 116,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
    },
    SecondImage: {
      width: 57,
      height: 57,
      marginLeft: 2,
    },
    ThirdImage: {
      backgroundColor: theme.color.gray300,
      width: 57,
      height: 57,
      marginLeft: 2,
      marginTop: 2,
      position: 'relative',
      flexDirection: 'row',
    },
    ImagesNumWrap: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ImagesNumText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
  })
);
