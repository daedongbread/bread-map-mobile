import React, { useEffect, useRef, useState } from 'react';
import { DeleteLocationComponent } from '@/components/EditBakery';
import { RootRouteProps } from '@/pages/MainStack/EditBakeryStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';

export function DeleteLocationContainer() {
  const {
    params: { type, url: curPhotoUrl },
  } = useRoute<RootRouteProps<'DeleteLocation'>>();
  const cancelBottomSheetRef = useRef<BottomSheet>();
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const [curType, setCurType] = useState(type);
  const [curLocationUrl, setCurLocationUrl] = useState('');

  const onClickRight = () => {
    if (curType === 'Album') {
      navigation.pop();
    } else {
      cancelBottomSheetRef.current?.expand();
    }
  };

  useEffect(() => {
    if (curLocationUrl) {
      setCurType('Confirm');
    }
  }, [curLocationUrl]);

  return (
    <DeleteLocationComponent
      onClickRight={onClickRight}
      curType={curType}
      setCurLocationUrl={setCurLocationUrl}
      curPhotoUrl={curPhotoUrl!!}
      curLocationUrl={curLocationUrl}
      cancelBottomSheetRef={cancelBottomSheetRef}
    />
  );
}
