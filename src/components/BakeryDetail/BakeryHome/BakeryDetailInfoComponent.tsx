import React, { useRef } from 'react';
import { Dimensions, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import Share from 'react-native-share';
import VersionCheck from 'react-native-version-check';
import { BakerySingleEntity, FlagInfo } from '@/apis/bakery/types';
import { BakeryButton } from '@/components/BakeryDetail/BakeryHome/BakeryButton';
import { ReviewSummary } from '@/components/BakeryDetail/BakeryHome/ReviewSummary';
import { RowInfo } from '@/components/BakeryDetail/BakeryHome/RowInfo';
import { BookmarkList } from '@/components/Map/BakeryBookmarksBottomSheet';
import { CustomImage } from '@/components/Shared/CustomImage';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { numberFormat, resizePixels } from '@/utils';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import {
  CircleFlag,
  CirclePencil,
  CircleStar,
  ClockIcon,
  EditIcon,
  FileTextIcon,
  MapPinIcon,
  PhoneIcon,
  ShareSolidIcon,
  WishIcon,
} from '@shared/Icons';
import { HomePageRowInfo } from './HomePageRowInfo';

const { width } = Dimensions.get('screen');

type Props = {
  bakeryId: number;
  bakery?: BakerySingleEntity;
  flagInfo: FlagInfo;
  onPressReportPhoto: () => void;
  onBookmarkSuccess: (selectBookmark: BookmarkList) => void;
  onPressBookmarkDisable: () => void;
};

export const BakeryDetailInfoComponent = ({
  bakeryId,
  bakery,
  flagInfo,
  onPressReportPhoto,
  onBookmarkSuccess,
  onPressBookmarkDisable,
}: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const NavigationKey = useNavigationState(state => state);
  const actionSheetRef = useRef<ActionSheet>(null);

  const actionSheetOptions = [`통화 ${bakery?.bakeryInfo.phoneNumber}`, '취소'];
  const isDefaultImage = bakery?.bakeryInfo?.images[0]?.includes('defaultImage');

  const onPressSaveBtn = () => {
    if (flagInfo.isFlaged) {
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
    if (!bakery?.bakeryInfo.name) {
      return;
    }
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewTagSelect',
      params: {
        bakeryId,
        bakeryName: bakery?.bakeryInfo.name,
      },
    });
  };

  const onPressShareBtn = async () => {
    const appStoreUrl = await VersionCheck.getAppStoreUrl({
      appID: '6445900733',
    });
    let replacedAppStoreUrl = `https://${appStoreUrl.replace('itms-apps://', '')}`;

    const playStoreUrl = await VersionCheck.getPlayStoreUrl({
      packageName: 'com.daedongbread',
    });

    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      message: `[빵순이 빵돌이 다 모여라! 🍞 ]\n리얼 빵 맛집을 찾고싶다면, 대동빵지도 앱을 설치해주세요\n\n[앱 스토어]\n${replacedAppStoreUrl}\n[플레이 스토어]\n${playStoreUrl}`,
    };

    Share.open(shareOptions).catch(() => null);
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

  const onPhoneClick = () => {
    actionSheetRef.current?.show();
  };

  const onFilterItemClick = (index: number) => {
    if (index === 0) {
      Linking.openURL(`tel:${bakery?.bakeryInfo.phoneNumber}`);
    }
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <CustomImage
          style={styles.image}
          resizeMode="cover"
          source={{ uri: bakery?.bakeryInfo.images[0] }}
          width={width}
          height={200}
          resizedWidth={360}
          resizedHeight={200}
          isResizable
          isDimmed={isDefaultImage}
        />

        <View style={styles.reportButtonContainer}>
          <TouchableOpacity onPress={onPressReportPhoto}>
            <Text style={styles.reportButtonText}>사진제보하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SplitRow height={24} />

      <View style={styles.contentContainer}>
        <Text color={theme.color.gray900} presets={['subhead', 'bold']}>
          {bakery?.bakeryInfo.name}
        </Text>
        <SplitRow height={8} />
        <View style={styles.reviewSummaryContainer}>
          <View style={styles.summaryContainer}>
            <ReviewSummary text={numberFormat(bakery?.bakeryInfo.flagNum || 0)} icon={<CircleFlag />} />
            <ReviewSummary text={(bakery?.bakeryInfo.rating || 0).toFixed(1)} icon={<CircleStar />} />
            <ReviewSummary text={numberFormat(bakery?.bakeryInfo.reviewNum || 0)} icon={<CirclePencil />} />
          </View>

          {bakery?.pioneerInfo.pioneerNickName && (
            <View style={styles.reviewerContainer}>
              <Text color={theme.color.primary500} presets={['caption2', 'bold']}>
                {bakery.pioneerInfo.pioneerNickName}
              </Text>
              <Text color={theme.color.gray800} presets={['caption2', 'bold']}>
                님 개척
              </Text>
            </View>
          )}
        </View>

        <SplitRow height={16} />

        <View style={styles.actionButtonContainer}>
          {flagInfo.isFlaged ? (
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
          {!!bakery?.bakeryInfo.address && (
            <RowInfo icon={<MapPinIcon />} text={bakery?.bakeryInfo.address} isCopyable />
          )}
          {!!bakery?.bakeryInfo.hours && <RowInfo icon={<ClockIcon />} text={bakery?.bakeryInfo.hours} />}
          {!!bakery?.bakeryInfo.instagramURL && (
            <HomePageRowInfo
              websiteURL={bakery.bakeryInfo.websiteURL}
              instagramURL={bakery.bakeryInfo.instagramURL}
              facebookURL={bakery.bakeryInfo.facebookURL}
              blogURL={bakery.bakeryInfo.blogURL}
            />
          )}
          {!!bakery?.bakeryInfo.phoneNumber && (
            <RowInfo
              onPressText={onPhoneClick}
              icon={<PhoneIcon />}
              text={bakery?.bakeryInfo.phoneNumber}
              isUnderLine
            />
          )}

          <TouchableOpacity style={styles.editButton} onPress={onPressEditBakeryInfo}>
            <FileTextIcon />
            <Text style={styles.editButtonText}>빵집 정보 수정하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ActionSheet
        statusBarTranslucent
        ref={actionSheetRef}
        options={actionSheetOptions}
        cancelButtonIndex={1}
        onPress={onFilterItemClick}
        theme="ios"
      />
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
      borderColor: theme.color.gray300,
      marginTop: 12,
    },
    editButtonText: {
      color: theme.color.gray800,
      fontWeight: 'bold',
      fontSize: 12,
      marginLeft: 4,
    },
    actionSheet: {
      fontSize: 18,
      color: '#4992FF',
    },
  })
);
