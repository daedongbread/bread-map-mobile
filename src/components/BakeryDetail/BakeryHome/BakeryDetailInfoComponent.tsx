import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Share from 'react-native-share';
import { BakerySingleEntity } from '@/apis/bakery/types';
import { BakeryButton } from '@/components/BakeryDetail/BakeryHome/BakeryButton';
import { ReviewSummary } from '@/components/BakeryDetail/BakeryHome/ReviewSummary';
import { RowInfo } from '@/components/BakeryDetail/BakeryHome/RowInfo';
import { BookmarkList } from '@/components/Home/BakeryBookmarksBottomSheet';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { numberFormat, resizePixels } from '@/utils';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import {
  CircleFlag,
  CirclePencil,
  CircleStar,
  ClockIcon,
  EarthIcon,
  EditIcon,
  FileTextIcon,
  MapPinIcon,
  PhoneIcon,
  ShareSolidIcon,
  WishIcon,
} from '@shared/Icons';

const defaultMessage = '미정';

type Props = {
  bakeryId: number;
  bakery?: BakerySingleEntity;
  isFlaged: boolean;
  onPressReportPhoto: () => void;
  onBookmarkSuccess: (selectBookmark: BookmarkList) => void;
  onPressBookmarkDisable: () => void;
};

export const BakeryDetailInfoComponent = ({
  bakeryId,
  bakery,
  isFlaged,
  onPressReportPhoto,
  onBookmarkSuccess,
  onPressBookmarkDisable,
}: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const NavigationKey = useNavigationState(state => state);

  const onPressSaveBtn = () => {
    if (isFlaged) {
      onPressBookmarkDisable();
    } else {
      onNavBookmark();
    }
  };

  const onNavBookmark = () => {
    navigation.navigate('MainStack', {
      screen: 'BookmarkBottomSheet',
      params: {
        bakeryId: bakeryId,
        name: bakery?.bakeryInfo.name!,
        onSaveSuccess: (selectBookmark: BookmarkList) => onBookmarkSuccess(selectBookmark),
      },
    });
  };

  const onPressReviewWriteBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };

  const onPressShareBtn = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      message: 'app store url 입니다 https://appstore',
    };

    Share.open(shareOptions).catch(e => null);
  };

  const onPressEditBakeryInfo = () => {
    navigation.push('EditBakeryStack', {
      screen: 'EditBakery',
      params: {
        bakeryId,
        NavigationKey: NavigationKey.routes[0].key,
      },
    });
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: bakery?.bakeryInfo.image || 'https://via.placeholder.com/360' }}
          resizeMode="cover"
        />
        <View style={styles.reportButtonContainer}>
          <TouchableOpacity onPress={onPressReportPhoto}>
            <Text style={styles.reportButtonText}>사진제보하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.bakeryNameText}>{bakery?.bakeryInfo.name}</Text>
        <SplitRow height={8} />
        <View style={styles.reviewSummaryContainer}>
          <View style={styles.summaryContainer}>
            <ReviewSummary text={numberFormat(bakery?.bakeryInfo.flagNum || 0)} icon={<CircleFlag />} />
            <ReviewSummary text={String(bakery?.bakeryInfo.rating!)} icon={<CircleStar />} />
            <ReviewSummary text={String(bakery?.bakeryInfo.reviewNum)} icon={<CirclePencil />} />
          </View>

          <View style={styles.reviewerContainer}>
            <Text style={styles.reviewerText}>빵빵빵순</Text>
            <Text style={styles.reviewerSuffixText}>님 개척</Text>
          </View>
        </View>
        <SplitRow height={16} />
        <View style={styles.actionButtonContainer}>
          {isFlaged ? (
            <BakeryButton
              text={'저장됨'}
              textColor={theme.color.primary500}
              icon={<WishIcon fill={theme.color.primary500} />}
              onPress={onPressSaveBtn}
            />
          ) : (
            <BakeryButton text={'저장하기'} icon={<WishIcon fill={'#757575'} />} onPress={onPressSaveBtn} />
          )}
          <BakeryButton text={'리뷰작성'} icon={<EditIcon />} onPress={onPressReviewWriteBtn} />
          <BakeryButton text={'공유하기'} icon={<ShareSolidIcon />} onPress={onPressShareBtn} />
        </View>

        <View style={styles.informationContainer}>
          <RowInfo icon={<MapPinIcon />} text={bakery?.bakeryInfo.address || defaultMessage} isCopyable />
          <RowInfo icon={<ClockIcon />} text={bakery?.bakeryInfo.hours || defaultMessage} />
          <RowInfo icon={<EarthIcon />} text={bakery?.bakeryInfo.websiteURL || defaultMessage} />
          <RowInfo icon={<PhoneIcon />} text={bakery?.bakeryInfo.phoneNumber || defaultMessage} isCopyable />
          <TouchableOpacity style={styles.editButton} onPress={onPressEditBakeryInfo}>
            <FileTextIcon />
            <Text style={styles.editButtonText}>빵집 정보 수정하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
    reportButtonContainer: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 100,
      opacity: 0.8,
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    reportButtonText: {
      color: theme.color.gray800,
      fontSize: 10,
      fontWeight: '600',
      lineHeight: 14,
    },
    bakeryNameText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 24,
    },
    reviewSummaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    summaryContainer: {
      flexDirection: 'row',
    },
    summaryText: {
      fontSize: 12,
    },
    reviewerContainer: {
      flexDirection: 'row',
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
