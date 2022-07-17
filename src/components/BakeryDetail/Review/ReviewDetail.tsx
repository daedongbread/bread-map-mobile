import React from 'react';
import { Text, View } from 'react-native';
import { BakeryReviewStackParamList } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<BakeryReviewStackParamList, 'BakeryReviewDetail'>;
const ReviewDetail: React.FC<Props> = ({ route }) => {
  const {
    params: { info, review },
  } = route;

  return (
    <View>
      <Text>
        Review Detail {info.bakeryName} {review.contents}
      </Text>
    </View>
  );
};

export { ReviewDetail };
