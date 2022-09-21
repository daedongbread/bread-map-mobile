import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BakeryMenuStackParamList,
  BakeryReviewStackParamList,
} from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { MainStackParamList } from '@/pages/MainStack/Stack';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';

import { BakeryReview, resizePixels } from '@/utils';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Reviews } from '@shared/Reviews';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Navigation = CompositeScreenProps<
  StackScreenProps<BakeryMenuStackParamList, 'BakeryMenus'>,
  CompositeScreenProps<StackScreenProps<MainStackParamList>, StackScreenProps<BakeryReviewStackParamList>>
>;

const ReviewList: React.FC = () => {
  const { bakery } = useBakeryDetail();

  const navigation = useNavigation<Navigation['navigation']>();

  const onPress = (review: BakeryReview) => {
    if (!bakery) {
      return;
    }
    navigation.push('BakeryReviewDetail', { info: bakery.bakeryInfo, review });
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
            totalCount={bakery?.bakeryReviews.length || 0}
            addBtnText={'리뷰 작성'}
            onPressAddBtn={onPressAddBtn}
          />
        }
        reviews={bakery?.bakeryReviews!}
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
