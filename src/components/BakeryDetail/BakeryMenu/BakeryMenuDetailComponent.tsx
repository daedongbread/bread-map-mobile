import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReviewEntity } from '@/apis/bakery/types';
import { MenuEntity } from '@/apis/menu/type';
import { TabIcon } from '@/components/Home/BakeriesBottomSheet/TabIcon';
import { Header } from '@/components/Shared/Header';
import { BreadRating } from '@/components/Shared/Rating';
import Review from '@/components/Shared/Reviews/Review';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

type Props = {
  reviews?: ReviewEntity;
  menu: MenuEntity;
  activeTab: string;
  onPressTab: (tab: string) => void;
  refetchReview: () => void;
};

const tempImage = 'https://cdn.paris.spl.li/wp-content/uploads/까방베르-치즈-후레쉬번_썸네일1-1280x1280.png';

export const BakeryMenuDetailComponent = ({ menu, reviews, activeTab, onPressTab, refetchReview }: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const tabItems = [
    { value: 'latest', label: '최신순' },
    { value: 'high', label: '별점높은순' },
    { value: 'low', label: '별점낮은순' },
  ];

  const onPressReviewWriteBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <Header title={menu.name} isPrevButtonShown />
        <Image
          style={styles.image}
          source={{
            uri: tempImage,
          }}
        />
        <View style={styles.breadInfoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{menu.name}</Text>
            <View>
              <BreadRating type={'menu'} rating={menu.rating} reviewLength={menu.reviewNum} />
            </View>
          </View>

          <SplitRow height={8} />
          <Text style={styles.priceText}>{Number(menu.price).toLocaleString()}원</Text>
        </View>
        <Divider />
        <View style={styles.reviewContainer}>
          <TabHeader
            onPressAddBtn={onPressReviewWriteBtn}
            title={'리뷰'}
            totalCount={menu.reviewNum}
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
            <SplitRow height={28} />
            {reviews &&
              reviews.contents.map((review, idx) => (
                <Review
                  mode="preview"
                  review={review}
                  key={idx}
                  isEnd={reviews.contents.length - 1 === idx}
                  refetchReview={refetchReview}
                />
              ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 250,
  },
  breadInfoContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: theme.color.gray900,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  priceText: {
    color: theme.color.primary500,
    fontSize: 16,
    fontWeight: '700',
  },
  reviewContainer: {
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
  },
});
