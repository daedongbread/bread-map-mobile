import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useGetBakery } from '@/apis/bakery';
import { FlagInfo } from '@/apis/bakery/types';
import { useBookmarkDisableBakery } from '@/apis/flag';
import { BakeryDetailInfoComponent } from '@/components/BakeryDetail/BakeryHome';
import { BookmarkList } from '@/components/Home/BakeryBookmarksBottomSheet';
import { useAppDispatch } from '@/hooks/redux';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { showToast } from '@/slices/toast';
import { theme } from '@/styles/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

const PHOTO_LIMIT = 10;

export const BakeryDetailInfoContainer = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<MainStackScreenProps<'ReportBakeryStack'>['navigation']>();
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();

  const bakeryId = route.params.bakeryId;
  const { bakery } = useGetBakery({ bakeryId });
  const { mutate: bookmarkDisable } = useBookmarkDisableBakery();

  const [flagInfo, setFlagInfo] = useState<FlagInfo>({
    isFlaged: false,
  });

  useEffect(() => {
    if (bakery?.flagInfo) {
      setFlagInfo(bakery?.flagInfo);
    }
  }, [bakery?.flagInfo]);

  const onBookmarkSuccess = (selectBookmark: BookmarkList) => {
    const icon = <selectBookmark.icon color={selectBookmark.color || theme.color.primary500} width={16} height={16} />;

    setFlagInfo({
      isFlaged: true,
      flagId: selectBookmark.flagId,
    });

    dispatch(
      showToast({
        text: `${selectBookmark?.name}에 저장되었습니다.`,
        icon: icon,
        duration: 5 * 1000,
      })
    );
  };

  const onPressBookmarkDisable = () => {
    const flagId = flagInfo.flagId;

    if (flagId == null) {
      return;
    }

    bookmarkDisable(
      { bakeryId, flagId },
      {
        onSuccess: () => {
          setFlagInfo({
            isFlaged: false,
          });
        },
      }
    );
  };

  const onPressReportPhoto = async () => {
    const { assets: photos, didCancel } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: PHOTO_LIMIT,
      presentationStyle: 'fullScreen',
    });

    if (!didCancel && photos && bakery?.bakeryInfo) {
      if (photos[0].fileSize! > 10000000) {
        dispatch(
          showToast({
            text: '10mb 이하만 업로드 가능합니다',
            duration: 5 * 1000,
          })
        );
        return;
      }
      navigation.push('ReportBakeryStack', {
        screen: 'ReportPhoto',
        params: {
          bakeryId,
          bakeryName: bakery.bakeryInfo.name,
          photos,
        },
      });
    }
  };

  return (
    <BakeryDetailInfoComponent
      bakeryId={bakeryId}
      bakery={bakery}
      flagInfo={flagInfo}
      onPressReportPhoto={onPressReportPhoto}
      onBookmarkSuccess={onBookmarkSuccess}
      onPressBookmarkDisable={onPressBookmarkDisable}
    />
  );
};
