import React from 'react';
import { Text, View } from 'react-native';
import { BakeryReviewStackParamList } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/BakeryDetailTopTab';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<BakeryReviewStackParamList, 'BakeryReviewDetail'>;
const ReviewDetail: React.FC<Props> = ({ route }) => {
  const {
    params: { review, info },
  } = route;

  return (
    <View>
      <Text>
        Review Detail {info.name} {review.content}
      </Text>
    </View>
  );
};

export { ReviewDetail };
