import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { BreadRating } from '../Rating';
import { SplitColumn } from '../SplitSpace';
import { Text } from '../Text';

type Props = {
  productName: string;
  rating: number;
  isEnd: boolean;
};

export const ProductRating = ({ productName, rating, isEnd }: Props) => (
  <>
    <View style={styles.container}>
      <Text presets={['caption2', 'bold']} style={styles.text}>
        {productName}
      </Text>
      <BreadRating rating={rating} type={'review'} />
    </View>
    {!isEnd && <SplitColumn width={8} />}
  </>
);

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.color.gray100,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    text: {
      fontWeight: '700',
      fontSize: 12,
      color: theme.color.gray600,
      marginRight: 0,
    },
  })
);
