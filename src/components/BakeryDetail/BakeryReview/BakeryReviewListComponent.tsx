import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ReviewContent } from '@/apis/bakery/types';
import { TabIcon } from '@/components/Map/BakeriesBottomSheet/TabIcon';
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
  bakeryId: number;
  reviews?: ReviewContent[];
  reviewCount?: number;
  activeTab: string;
  isBrief?: boolean;
  onPressTab: (tab: string) => void;
  refetchReview: ((pageNum: number) => void) | (() => void);
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

const NUMBER_OF_ELEMENTS = 5;
const { height } = Dimensions.get('screen');

export const BakeryReviewListComponent = ({
  bakeryId,
  reviews,
  reviewCount,
  activeTab,
  isBrief,
  onPressTab,
  refetchReview,
}: Props) => {
  const navigation = useNavigation<Navigation>();

  const HeaderRenderItem = () => {
    return (
      <>
        <TabHeader
          onPressAddBtn={onPressReviewWriteBtn}
          title={'리뷰'}
          totalCount={reviewCount || reviews?.length || 0}
          addBtnText={'리뷰작성'}
        />
        {reviews && reviews.length > 0 && (
          <View style={styles.tabContainer}>
            {tabItems.map(({ value, label }) => (
              <TabIcon key={value} value={value} activeTab={activeTab} onPress={onPressTab}>
                {label}
              </TabIcon>
            ))}
          </View>
        )}
      </>
    );
  };

  const ListEmptyRenderItem = () => {
    return (
      <View style={styles.reviewContainer}>
        <SplitRow height={isBrief ? 30 : height * 0.19} />
        <NoData title="리뷰가 없어요" subTitle="첫 리뷰를 등록해주세요." />
        {isBrief && <SplitRow height={height * 0.09} />}
      </View>
    );
  };

  const onPressReviewWriteBtn = () => {
    navigation.navigate('ReviewWriteStack', {
      screen: 'ReviewSelect',
      params: {
        bakeryId: bakeryId,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Divider />

      <View style={styles.reviewContainer}>
        <HeaderRenderItem />

        <SplitRow height={28} />

        {reviews && reviews.length ? (
          reviews.map((review, index) => {
            return (
              <Review
                key={review.reviewInfo.id}
                mode="preview"
                review={review}
                refetchReview={() => refetchReview(Math.floor(index / NUMBER_OF_ELEMENTS))}
                isEnd={reviews?.length - 1 === index}
              />
            );
          })
        ) : (
          <ListEmptyRenderItem />
        )}
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
    dvider: {
      marginHorizontal: -20,
    },
    tabContainer: {
      flexDirection: 'row',
    },
  })
);
