import React from 'react';
import { ListDetailComponent } from '@/components/Profile';
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { useGetFlag } from '@/apis/profile';
import { useAppSelector } from '@/hooks/redux';

export function ListDetailContainer() {
  const { accessToken } = useAppSelector(state => state.auth);
  const {
    params: { flagId, name, len, color },
  } = useRoute<RootRouteProps<'ListDetail'>>();
  const { data: getFlagData, loading } = useGetFlag({ accessToken: accessToken || '', flagId });

  return <ListDetailComponent name={name} getFlagData={getFlagData} loading={loading} len={len} color={color} />;
}
