import React, { useRef } from 'react';
import { deleteFlag, useGetFlag } from '@/apis/profile';
import { ListDetailComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';

export function ListDetailContainer() {
  const navigation = useNavigation();
  const editBottomSheetRef = useRef<BottomSheet>(null);
  const deleteBottomSheetRef = useRef<BottomSheet>(null);
  const { accessToken } = useAppSelector(state => state.auth);
  const {
    params: { flagId, name, color },
  } = useRoute<RootRouteProps<'ListDetail'>>();
  const { data: getFlagData, loading } = useGetFlag({ accessToken: accessToken || '', flagId });

  const onListDeleteClick = async () => {
    const response = await deleteFlag({ accessToken: accessToken!!, flagId: flagId });
    if (response.status === 204) {
      deleteBottomSheetRef.current?.close();
      navigation.goBack();
    }
  };

  return (
    <ListDetailComponent
      name={name}
      getFlagData={getFlagData}
      loading={loading}
      len={getFlagData?.length}
      color={color}
      deleteBottomSheetRef={deleteBottomSheetRef}
      editBottomSheetRef={editBottomSheetRef}
      onListDeleteClick={onListDeleteClick}
    />
  );
}
