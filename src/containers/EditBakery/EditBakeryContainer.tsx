import React, { useRef } from 'react';
import { EditBakeryComponent } from '@/components/EditBakery';
import { RootRouteProps } from '@/pages/MainStack/EditBakeryStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditBakeryContainer() {
  const {
    params: { bakeryId, NavigationKey },
  } = useRoute<RootRouteProps<'EditBakery'>>();
  const DeleteBakeryBottomSheetRef = useRef<BottomSheet>();
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  // const NavigationKey = useNavigationState(state => state);
  // console.log(editBakeryNavigationKey.routes[0].key);

  const onClickRight = () => {
    navigation.pop();
  };
  const onClickEdit = () => {
    navigation.push('EditBakeryStack', {
      screen: 'EditDetail',
      params: {
        bakeryId: bakeryId,
        NavigationKey: NavigationKey,
      },
    });
  };
  const onClickDelete = () => {
    DeleteBakeryBottomSheetRef.current?.expand();
  };

  return (
    <>
      <EditBakeryComponent
        onClickRight={onClickRight}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        DeleteBakeryBottomSheetRef={DeleteBakeryBottomSheetRef}
        bakeryId={bakeryId}
        NavigationKey={NavigationKey}
      />
    </>
  );
}
