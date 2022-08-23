import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Information, MenuList, ReviewList } from '@/components/BakeryDetail';
import { Divider } from '@/components/BakeryDetail/Divider';
import { BakeryButton } from '@/components/BakeryDetail/Home/BakeryButton';
import { ReviewSummary } from '@/components/BakeryDetail/Home/ReviewSummary';
import { RowInfo } from '@/components/BakeryDetail/Home/RowInfo';
import {
  CircleFlag,
  ClockIcon,
  EarthIcon,
  EditIcon,
  FileTextIcon,
  MapPinIcon,
  PhoneIcon,
  ShareSolidIcon,
  WishIcon,
} from '@/components/Shared/Icons';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

// TODO: 일부 아이콘 변경 필요
const BakeryHome: React.FC<BakeryDetailTabScreenProps<'BakeryDetailHome'>> = ({ route }) => {
  const { bakery } = useBakeryDetail();

  const bakeryId = route.params.bakeryId;

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/360' }} resizeMode="cover" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.bakeryNameText}>{bakery?.bakeryInfo.bakeryName}</Text>
        <View style={styles.reviewSummaryContainer}>
          <View style={styles.summaryContainer}>
            <ReviewSummary text={'1,200'} icon={<CircleFlag />} />
            <ReviewSummary text={'1,200'} icon={<CircleFlag />} />
            <ReviewSummary text={'1,200'} icon={<CircleFlag />} />
          </View>
          <View style={styles.reviewerContainer}>
            <Text style={styles.reviewerText}>빵빵빵순</Text>
            <Text style={styles.reviewerSuffixText}>님 개척</Text>
          </View>
        </View>
        <View style={styles.actionButtonContainer}>
          <BakeryButton text={'저장하기'} icon={<WishIcon />} />
          <BakeryButton text={'리뷰작성'} icon={<EditIcon />} />
          <BakeryButton text={'공유하기'} icon={<ShareSolidIcon />} />
        </View>
        <View style={styles.informationContainer}>
          <RowInfo icon={<MapPinIcon />} text={bakery?.bakeryInfo.address!} />
          <RowInfo icon={<ClockIcon />} text={bakery?.bakeryInfo.businessHour!} />
          <RowInfo icon={<EarthIcon />} text={bakery?.bakeryInfo.websiteUrlList[0]!} />
          <RowInfo icon={<PhoneIcon />} text={bakery?.bakeryInfo.telNumber!} />
          <TouchableOpacity style={styles.editButton}>
            <FileTextIcon />
            <Text style={styles.editButtonText}>빵집 정보 수정하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <MenuList />
      <Divider />
      <ReviewList />
      <Divider />
      <Information />
    </ScrollView>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {},
    contentContainer: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
    },
    imageContainer: {
      height: 200,
      width: '100%',
    },
    image: {
      height: '100%',
    },
    bakeryNameText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 24,
      marginBottom: 8,
    },
    reviewSummaryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    summaryContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 20,
    },
    summaryText: {
      fontSize: 12,
    },
    reviewerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: theme.color.primary50,
    },
    reviewerText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.color.primary500,
    },
    reviewerSuffixText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    actionButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    informationContainer: {
      paddingVertical: 20,
    },
    editButton: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: theme.color.gray500,
      marginTop: 12,
    },
    editButtonText: {
      color: theme.color.gray800,
      fontWeight: 'bold',
      fontSize: 12,
      marginLeft: 4,
    },
  })
);

export { BakeryHome };
