import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReviewDetailEntity } from '@/apis/bakery/types';
import { Header } from '@/components/Shared/Header';
import { LocationMarker } from '@/components/Shared/Icons';
import Review from '@/components/Shared/Reviews/Review';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { resizePixels } from '@/utils';
import { Divider } from '../Divider';

type Props = {
  review: ReviewDetailEntity;
};

const tempImage = 'https://cdn.paris.spl.li/wp-content/uploads/까방베르-치즈-후레쉬번_썸네일1-1280x1280.png';

export const BakeryReviewDetailComponent = ({ review }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${review.reviewDto.userInfo.nickName}님의 리뷰`} isPrevButtonShown />
      {/* TO DO : border가 아닌 shadow로 대체 */}
      <View style={styles.bakeryContainer}>
        {/* <Image style={styles.bakeryImage} source={{ uri: review.bakeryInfo.bkaeryImage }} /> */}
        <Image style={styles.bakeryImage} source={{ uri: tempImage }} />
        <SplitColumn width={8} />
        <View style={styles.bkaeryInfoContainer}>
          <Text style={styles.bakeryName}>{review.bakeryInfo.bakeryName}</Text>
          <SplitRow height={5} />
          <View style={styles.bakeryAddressContainer}>
            <LocationMarker />
            <Text style={styles.bakeryAddress}>{review.bakeryInfo.bakeryAddress}</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.reviewContainer}>
          <Review review={review.reviewDto} isEnd={true} onPress={() => null} refetchReview={() => null} />
        </View>
        <Divider />
        <View style={styles.commentContainer}>
          <Image
            style={styles.commentEmptyImage}
            source={require('@/components/Shared/Images/emptyData.png')}
            resizeMode={'contain'}
          />
          <SplitRow height={13} />
          <Text style={styles.commentEmptyText}>아직 댓글이 없어요</Text>
          <Text style={styles.commentEmptyText}>첫 댓글을 남겨주세요</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flex: 1,
    },
    bakeryContainer: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 36,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    bakeryImage: {
      width: 48,
      height: 48,
      borderRadius: 4,
    },
    bkaeryInfoContainer: {},
    bakeryName: {
      color: '#222222',
      fontSize: 16,
      fontWeight: '700',
    },
    bakeryAddressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bakeryAddress: {
      color: '#424242',
      fontSize: 12,
      fontWeight: '400',
      alignItems: 'center',
      justifyContent: 'center',
    },
    reviewContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    commentContainer: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    commentEmptyImage: {
      width: 100,
      height: 80,
    },
    commentEmptyText: {
      color: '#9E9E9E',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
    },
  })
);
