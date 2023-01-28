import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useGetBakery } from '@/apis/bakery';
import { useBookmarkDisableBakery } from '@/apis/flag';
import { BakeryDetailInfoComponent } from '@/components/BakeryDetail/BakeryHome';
import { BookmarkList } from '@/components/Home/BakeryBookmarksBottomSheet';
import { useAppDispatch } from '@/hooks/redux';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { showToast } from '@/slices/toast';
import { useNavigation, useRoute } from '@react-navigation/native';

const PHOTO_LIMIT = 10;

export const BakeryDetailInfoContainer = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<MainStackScreenProps<'ReportBakeryStack'>['navigation']>();
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();

  const bakeryId = route.params.bakeryId;
  const { bakery } = useGetBakery({ bakeryId });
  const { mutate: bookmarkDisable } = useBookmarkDisableBakery();

  const [isFlaged, setIsFlaged] = useState(bakery?.flagInfo.isFlaged || false);

  useEffect(() => {
    setIsFlaged(bakery?.flagInfo.isFlaged!);
  }, [bakery?.flagInfo.isFlaged]);

  const onBookmarkSuccess = (selectBookmark: BookmarkList) => {
    setIsFlaged(true);
    dispatch(
      showToast({
        text: `${selectBookmark?.name}에 저장되었습니다.`,
        icon: selectBookmark?.icon,
        duration: 5 * 1000,
      })
    );
  };

  const onPressBookmarkDisable = () => {
    const flagId = bakery?.flagInfo.flagId;

    if (flagId == null) {
      return;
    }

    bookmarkDisable(
      { bakeryId, flagId },
      {
        onSuccess: () => {
          setIsFlaged(false);
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
      navigation.push('ReportBakeryStack', {
        screen: 'ReportPhoto',
        params: {
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
      isFlaged={isFlaged}
      onPressReportPhoto={onPressReportPhoto}
      onBookmarkSuccess={onBookmarkSuccess}
      onPressBookmarkDisable={onPressBookmarkDisable}
    />
  );
};
