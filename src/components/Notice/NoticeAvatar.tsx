import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface Props {
  image: string;
}
export const NoticeAvatar = ({ image }: Props) => {
  return (
    <View style={styles.avatar}>
      <Image width={40} height={40} source={getImageSource(image)} />
    </View>
  );
};

const getImageSource = (image: string) => {
  if (image.includes('comment')) {
    return require('@/assets/noticeImage/comment.jpg');
  }

  if (image.includes('bread')) {
    return require('@/assets/noticeImage/bread.jpg');
  }

  if (image.includes('heart')) {
    return require('@/assets/noticeImage/heart.jpg');
  }

  if (image.includes('like')) {
    return require('@/assets/noticeImage/like.jpg');
  }

  return require('@/assets/noticeImage/michael-dam.jpg');
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
  },
});
