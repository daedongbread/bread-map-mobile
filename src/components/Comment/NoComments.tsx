import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { resizePixels } from '@/utils';

export const NoComments = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={require('@/components/Shared/Images/emptyData.png')} resizeMode={'contain'} />
    <SplitRow height={13} />
    <Text presets={['body2', 'semibold']} style={styles.text}>
      아직 댓글이 없어요{'\n'}첫 댓글을 남겨주세요
    </Text>
  </View>
);

const styles = StyleSheet.create(
  resizePixels({
    container: {
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 80,
    },
    text: {
      color: '#9E9E9E',
    },
  })
);
