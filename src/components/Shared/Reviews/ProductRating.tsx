import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { BreadRating } from '../Rating';
import { SplitColumn } from '../SplitSpace';
import { Text } from '../Text';
import { Row } from '../View';

type Props = {
  productName: string;
  rating: number;
  isEnd: boolean;
};

export const ProductRating = ({ productName, rating, isEnd }: Props) => (
  <>
    <Row style={styles.container}>
      <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
        {productName}
      </Text>
      <SplitColumn width={8} />
      <BreadRating rating={rating} type={'review'} />
    </Row>
    {!isEnd && <SplitColumn width={8} />}
  </>
);

const styles = StyleSheet.create(
  resizePixels({
    container: {
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.color.gray200,
    },
  })
);
