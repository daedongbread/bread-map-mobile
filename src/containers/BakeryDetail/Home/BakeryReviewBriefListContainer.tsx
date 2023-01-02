import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { useGetReviews } from '@/apis/review';
import { Divider } from '@/components/BakeryDetail/Divider';
import { TabHeader } from '@/components/BakeryDetail/TabHeader';
import { Button } from '@/components/Shared/Button/Button';
import Review from '@/components/Shared/Reviews/Review';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';

type Props = {
  bakeryId: number;
};

export const BakeryReviewBriefListContainer = ({ bakeryId }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const { reviews } = useGetReviews({ bakeryId });

  const onPressMoreButton = () => {
    //TODO  navigation 타입 정리 필요함
    (navigation as any).jumpTo('BakeryDetailReview', { bakeryId });
  };

  const onPress = (review: BakeryReviewEntity) => {
    if (!review) {
      return;
    }

    navigation.push('MainTab', {
      screen: 'HomeStack',
      params: {
        screen: 'Bakery',
        params: {
          screen: 'BakeryDetailReview',
          params: { bakeryId: bakeryId },
        },
      },
    });
  };

  const onPressAddBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };
  const briefReviews = reviews?.slice(0, 3) || [];
  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.header}>
        <TabHeader
          title={'리뷰'}
          totalCount={reviews?.length || 0}
          addBtnText={'리뷰 작성'}
          onPressAddBtn={onPressAddBtn}
        />
        {briefReviews.map((review, idx) => (
          <Review review={review} onPress={onPress} key={idx} isEnd={briefReviews.length - 1 === idx} />
        ))}
      </View>

      <Button
        size="large"
        onPress={onPressMoreButton}
        appearance="terdary"
        style={{ marginHorizontal: 20, marginVertical: 32 }}
      >
        <Text style={styles.footerButtonText}>전체리뷰보기</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      marginTop: 24,
      backgroundColor: 'white',
    },

    footerButtonText: {
      fontSize: 14,
      fontWeight: '700',
    },
    header: {
      paddingHorizontal: 20,
    },
  })
);
