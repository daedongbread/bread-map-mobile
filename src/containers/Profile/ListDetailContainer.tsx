import React, { useRef } from 'react';
import { useQueryClient } from 'react-query';
import { deleteFlag, useGetFlag } from '@/apis/profile';
import { ListDetailComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/MainTab/ProfileStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';

export function ListDetailContainer() {
  const queryClient = useQueryClient();
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
      queryClient.refetchQueries(['useGetFlag']);
      deleteBottomSheetRef.current?.close();
      navigation.goBack();
    }
  };

  return (
    <ListDetailComponent
      name={name}
      getFlagData={getFlagData}
      loading={loading}
      len={getFlagData?.flagBakeryInfoList?.length}
      color={color}
      deleteBottomSheetRef={deleteBottomSheetRef}
      editBottomSheetRef={editBottomSheetRef}
      onListDeleteClick={onListDeleteClick}
    />
  );
}
