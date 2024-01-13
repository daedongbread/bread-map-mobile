import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BookmarkList } from '@/components/Map/BakeryBookmarksBottomSheet';
import { useAppDispatch } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { showToast } from '@/slices/toast';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import MapActiveIcon from '@shared/Icons/MapActiveIcon.svg';
import MapIcon from '@shared/Icons/MapIcon.svg';

type Props = {
  isActive: boolean;
  bakeryId: number;
  bakeryName: string;
};

type Navigation = MainStackScreenProps<any>['navigation'];

export const FlagButton = React.memo(({ isActive: _isActive, bakeryId, bakeryName }: Props) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<Navigation>();
  const [isActive, setIsActive] = useState(_isActive);

  const onPress = () => {
    navigation.navigate('BookmarkBottomSheet', {
      bakeryId,
      name: bakeryName,
      onSaveSuccess: (selectBookmark: BookmarkList) => onSaveSuccessCallback(selectBookmark),
    });
  };

  const onPressActive = () => {
    setIsActive(false);

    // fetching...
  };

  const onSaveSuccessCallback = (selectBookmark: BookmarkList) => {
    const icon = <selectBookmark.icon color={selectBookmark.color || theme.color.primary500} width={16} height={16} />;

    setIsActive(true);
    dispatch(
      showToast({
        text: `${selectBookmark?.name}에 저장되었습니다.`,
        icon: icon,
        duration: 5 * 1000,
      })
    );
  };

  return (
    <TouchableOpacity onPress={isActive ? onPressActive : onPress}>
      {isActive ? <MapActiveIcon width={20} height={20} /> : <MapIcon width={20} height={20} />}
    </TouchableOpacity>
  );
});
