import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ReviewContent } from '@/apis/bakery/types';
import { TabIcon } from '@/components/Home/BakeriesBottomSheet/TabIcon';
import { Review } from '@/components/Shared/Reviews';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { BakeryReviewStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/Stack';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { NoData } from '../NoData';
import { TabHeader } from '../TabHeader';

type Props = {
  reviews?: ReviewContent[];
  reviewCount?: number;
  activeTab: string;
  isBrief?: boolean;
  onPressTab: (tab: string) => void;
  refetchReview: () => void;
};

const tabItems = [
  { value: 'latest', label: '최신순' },
  { value: 'high', label: '별점높은순' },
  { value: 'low', label: '별점낮은순' },
];

type Navigation = CompositeScreenProps<
  BakeryReviewStackScreenProps<'BakeryReview'>,
  MainStackScreenProps<keyof MainStackParamList>
>['navigation'];

const { height } = Dimensions.get('screen');

export const BakeryReviewListComponent = ({
  reviews,
  reviewCount,
  activeTab,
  isBrief,
  onPressTab,
  refetchReview,
}: Props) => {
  const navigation = useNavigation<Navigation>();

  const bakeryId = reviews?.length ? reviews[0].bakeryInfo.bakeryId : null;

  const onPressReviewWriteBtn = () => {
    if (bakeryId !== null) {
      navigation.navigate('ReviewWriteStack', {
        screen: 'ReviewSelect',
        params: {
          bakeryId: bakeryId,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.reviewContainer}>
        <TabHeader
          onPressAddBtn={onPressReviewWriteBtn}
          title={'리뷰'}
          totalCount={reviewCount || reviews?.length || 0}
          addBtnText={'리뷰작성'}
        />
        <View>
          {reviews && reviews.length > 0 && (
            <View style={styles.tabContainer}>
              {tabItems.map(({ value, label }) => (
                <TabIcon key={value} value={value} activeTab={activeTab} onPress={onPressTab}>
                  {label}
                </TabIcon>
              ))}
            </View>
          )}

          {reviews && reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <Review
                mode="preview"
                key={review.reviewInfo.id}
                review={review}
                refetchReview={refetchReview}
                isEnd={reviews.length - 1 === idx}
              />
            ))
          ) : (
            <>
              <SplitRow height={isBrief ? 30 : height * 0.19} />
              <NoData title="메뉴가 없어요" subTitle="첫 메뉴를 제보해주세요." />
              {isBrief && <SplitRow height={height * 0.09} />}
            </>
          )}
        </View>
      </View>
    </View>
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
