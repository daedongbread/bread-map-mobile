import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BakeryInfo, BakeryReview } from '@/utils';

// TODO: nested된 navigation의 타입을 입히기 어려워 Props로 대체함

type Props = {
  info: BakeryInfo;
  review: BakeryReview;
};
const ReviewDetail: React.FC<Props> = ({ info, review }) => {
  return (
    <View>
      <Text>Review Detail</Text>
    </View>
  );
};

export { ReviewDetail };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
