import React, { useState } from 'react';
import { useGetBakery } from '@/apis/bakery';
import { BakeryDetailInfoComponent } from '@/components/BakeryDetail/BakeryHome';
import { BookmarkList } from '@/components/Home/BakeryBookmarksBottomSheet';
import { useAppDispatch } from '@/hooks/redux';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail';
import { showToast } from '@/slices/toast';
import { useRoute } from '@react-navigation/native';

export const BakeryDetailInfoContainer = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailHome'>['route']>();

  const bakeryId = route.params.bakeryId;
  const { bakery } = useGetBakery({ bakeryId });

  const [isFlaged, setIsFlaged] = useState(bakery?.info.isFlaged || false);

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

  const onPressBookmarkDisabled = () => {
    setIsFlaged(false);
  };

  return (
    <BakeryDetailInfoComponent
      bakeryId={bakeryId}
      bakery={bakery}
      isFlaged={isFlaged}
      onBookmarkSuccess={onBookmarkSuccess}
      onPressBookmarkDisabled={onPressBookmarkDisabled}
    />
  );
};
