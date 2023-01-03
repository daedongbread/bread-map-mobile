import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useGetBakery } from '@/apis/bakery';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { useGetReviews } from '@/apis/review';

import { BakeryReviewStackParamList } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/BakeryDetailTopTab';
import { MainStackParamList } from '@/pages/MainStack/Stack';

import { resizePixels } from '@/utils';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { Reviews } from '@shared/Reviews';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Navigation = CompositeScreenProps<
  StackScreenProps<MainStackParamList>,
  StackScreenProps<BakeryReviewStackParamList>
>;
type Props = NativeStackScreenProps<BakeryReviewStackParamList, 'BakeryReviews'>;
const ReviewList: React.FC<Props> = ({ route }) => {
  const { bakeryId } = route.params;
  const { reviews } = useGetReviews({ bakeryId });
  const { bakery } = useGetBakery({ bakeryId });

  const navigation = useNavigation<Navigation['navigation']>();

  const onPress = (review: BakeryReviewEntity) => {
    if (!reviews || !bakery) {
      return;
    }
    navigation.push('BakeryReviewDetail', {
      review: review,
      info: bakery.info,
    });
  };

  const onPressAddBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };

  return (
    <View style={styles.container}>
      <Divider />
      <Reviews
        headerComponent={
          <TabHeader
            title={'리뷰'}
            totalCount={reviews?.length || 0}
            addBtnText={'리뷰 작성'}
            onPressAddBtn={onPressAddBtn}
          />
        }
        reviews={reviews!}
        onPress={onPress}
      />
    </View>
  );
};
export { ReviewList };

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: 'white',
    },
  })
);
