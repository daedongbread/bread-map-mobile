import React from 'react';
import { useGetFlag } from '@/apis/profile';
import { ListDetailComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { useRoute } from '@react-navigation/native';

export function ListDetailContainer() {
  const { accessToken } = useAppSelector(state => state.auth);
  const {
    params: { flagId, name, color },
  } = useRoute<RootRouteProps<'ListDetail'>>();
  const { data: getFlagData, loading } = useGetFlag({ accessToken: accessToken || '', flagId });

  return (
    <ListDetailComponent
      name={name}
      getFlagData={getFlagData}
      loading={loading}
      len={getFlagData?.length}
      color={color}
    />
  );
}
