import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BakerySingleEntity } from '@/apis/bakery/types';
import { BakeryButton } from '@/components/BakeryDetail/BakeryHome/BakeryButton';
import { ReviewSummary } from '@/components/BakeryDetail/BakeryHome/ReviewSummary';
import { RowInfo } from '@/components/BakeryDetail/BakeryHome/RowInfo';
import { BookmarkList } from '@/components/Home/BakeryBookmarksBottomSheet';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { numberFormat, resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
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
  onBookmarkSuccess: (selectBookmark: BookmarkList) => void;
  onPressBookmarkDisabled: () => void;
};

export const BakeryDetailInfoComponent = ({
  bakeryId,
  bakery,
  isFlaged,
  onBookmarkSuccess,
  onPressBookmarkDisabled,
}: Props) => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const onPressSaveBtn = () => {
    if (isFlaged) {
      onPressBookmarkDisabled();
    } else {
      onNavBookmark();
    }
  };

  const onNavBookmark = () => {
    navigation.navigate('MainStack', {
      screen: 'BookmarkBottomSheet',
      params: {
        bakeryId: bakeryId,
        name: bakery?.info.name!,
        onSaveSuccess: (selectBookmark: BookmarkList) => onBookmarkSuccess(selectBookmark),
      },
    });
  };

  const onPressReviewWriteBtn = () => {
    navigation.push('ReviewWriteStack', {
      screen: 'ReviewSelect',
    });
  };

  const onPressEditBakeryInfo = () => {
    navigation.push('EditBakeryStack', {
      screen: 'EditBakery',
      params: {
        bakeryId,
      },
    });
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: bakery?.info.image || 'https://via.placeholder.com/360' }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.bakeryNameText}>{bakery?.info.name}</Text>
        <View style={styles.reviewSummaryContainer}>
          <View style={styles.summaryContainer}>
            <ReviewSummary text={numberFormat(bakery?.info.flagNum || 0)} icon={<CircleFlag />} />
            <ReviewSummary text={String(bakery?.info.rating!)} icon={<CircleStar />} />
            <ReviewSummary text={String(bakery?.info.reviewNum)} icon={<CirclePencil />} />
          </View>

          <View style={styles.reviewerContainer}>
            <Text style={styles.reviewerText}>빵빵빵순</Text>
            <Text style={styles.reviewerSuffixText}>님 개척</Text>
          </View>
        </View>

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
          <BakeryButton text={'공유하기'} icon={<ShareSolidIcon />} onPress={() => null} />
        </View>

        <View style={styles.informationContainer}>
          <RowInfo icon={<MapPinIcon />} text={bakery?.info.address || defaultMessage} isCopyable />
          <RowInfo icon={<ClockIcon />} text={bakery?.info.hours || defaultMessage} />
          <RowInfo icon={<EarthIcon />} text={bakery?.info.websiteURL || defaultMessage} />
          <RowInfo icon={<PhoneIcon />} text={bakery?.info.phoneNumber || defaultMessage} isCopyable />
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
