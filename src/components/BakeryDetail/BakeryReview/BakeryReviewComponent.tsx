import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ReviewEntity } from '@/apis/bakery/types';
import { TabIcon } from '@/components/Home/BakeriesBottomSheet/TabIcon';
import Review from '@/components/Shared/Reviews/Review';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Props = {
  reviews?: ReviewEntity;
  activeTab: string;
  onPressTab: (tab: string) => void;
  refetchReview: () => void;
};

const tabItems = [
  { value: 'latest', label: '최신순' },
  { value: 'high', label: '별점높은순' },
  { value: 'low', label: '별점낮은순' },
];

export const BakeryReviewComponent = ({ reviews, activeTab, onPressTab, refetchReview }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const onPressReviewWriteBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Divider />
      <View style={styles.reviewContainer}>
        <TabHeader
          onPressAddBtn={onPressReviewWriteBtn}
          title={'리뷰'}
          totalCount={reviews?.contents.length || 0}
          addBtnText={'리뷰작성'}
        />
        <View>
          <View style={styles.tabContainer}>
            {tabItems.map(({ value, label }) => (
              <TabIcon key={value} value={value} activeTab={activeTab} onPress={onPressTab}>
                {label}
              </TabIcon>
            ))}
          </View>
          {reviews &&
            reviews.contents.map((review, idx) => (
              <Review
                key={idx}
                review={review}
                refetchReview={refetchReview}
                onPress={() => null}
                isEnd={reviews.contents.length - 1 === idx}
              />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: 'white',
    },
    reviewContainer: {
      paddingHorizontal: 20,
    },
    tabContainer: {
      flexDirection: 'row',
    },
  })
);
