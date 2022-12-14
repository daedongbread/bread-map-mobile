import React, { useRef } from 'react';
import { EditBakeryComponent } from '@/components/EditBakery';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

export default function EditBakeryContainer() {
  const DeleteBakeryBottomSheetRef = useRef<BottomSheet>();
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const onClickRight = () => {
    // navigation.push('ProfileStack', {
    //   screen: 'EditProfile',
    // });
    navigation.pop();
  };
  const onClickEdit = () => {
    navigation.push('EditBakeryStack', {
      screen: 'EditDetail',
    });
  };
  const onClickDelete = () => {
    // navigation.push('EditBakeryStack', {
    //   screen: 'DeleteBakery',
    // });
    DeleteBakeryBottomSheetRef.current?.expand();
  };
  return (
    <>
      <EditBakeryComponent
        onClickRight={onClickRight}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        DeleteBakeryBottomSheetRef={DeleteBakeryBottomSheetRef}
      />
    </>
  );
}
