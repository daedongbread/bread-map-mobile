import React from 'react';
import { follow, unFollow, useGetFollower, useGetFollowing } from '@/apis/profile';
import { FollowDetailComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { useRoute } from '@react-navigation/native';

export function FollowDetailContainer() {
  const {
    params: { index, userId },
  } = useRoute<RootRouteProps<'FollowDetail'>>();

  const { accessToken } = useAppSelector(state => state.auth);
  const {
    followingData,
    loading: followingLoading,
    refetch: followingRefetch,
  } = useGetFollowing({
    accessToken: accessToken || '',
    enabled: index === 0,
    userId,
  });
  const {
    followerData,
    loading: followerLoading,
    refetch: followerRefetch,
  } = useGetFollower({
    accessToken: accessToken || '',
    enabled: index === 1,
    userId,
  });
  console.log(followerData);

  const onFollowButtonClick = async (item: any) => {
    console.log(item, index);

    if (item?.isFollow) {
      const response = await unFollow({ userId: item?.userId });
      console.log(response);
    } else {
      const response = await follow({ userId: item?.userId });
      console.log(response);
    }

    if (index === 0) {
      followingRefetch();
    } else {
      followerRefetch();
    }
  };

  return (
    <FollowDetailComponent
      index={index}
      followingData={followingData}
      followerData={followerData}
      followingLoading={followingLoading}
      followerLoading={followerLoading}
      onFollowButtonClick={onFollowButtonClick}
    />
  );
}
