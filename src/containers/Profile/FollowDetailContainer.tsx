import React from 'react';
import { follow, unFollow, useGetFollower, useGetFollowing } from '@/apis/profile';
import { FollowDetailComponent } from '@/components/Profile';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { useRoute } from '@react-navigation/native';

export function FollowDetailContainer() {
  const {
    params: { index, userId },
  } = useRoute<RootRouteProps<'FollowDetail'>>();

  const {
    followingData,
    loading: followingLoading,
    refetch: followingRefetch,
  } = useGetFollowing({
    enabled: index === 0,
    userId,
  });
  const {
    followerData,
    loading: followerLoading,
    refetch: followerRefetch,
  } = useGetFollower({
    enabled: index === 1,
    userId,
  });

  const onFollowButtonClick = async (item: any) => {
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
