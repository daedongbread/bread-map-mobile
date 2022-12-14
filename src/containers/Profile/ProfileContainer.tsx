import React, { useState } from 'react';
import { useGetProfileInfo } from '@/apis/profile';
import { ProfileComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';

//로직
export function ProfileContainer() {
  const { accessToken } = useAppSelector(state => state.auth);
  const { profileInfoData, loading } = useGetProfileInfo({ accessToken: accessToken || '', type: 'me' });
  const [buttonType, setButtonType] = useState(0);

  return (
    <ProfileComponent
      profileInfoData={profileInfoData}
      loading={loading}
      buttonType={buttonType}
      setButtonType={setButtonType}
    />
  );
}
