import React, { useCallback, useRef, useState } from 'react';
import Toast from 'react-native-easy-toast';
import { follow, unFollow, useGetProfileInfo } from '@/apis/profile';
import { useGetFlags } from '@/apis/profile/useGetFlags';
import { requestGetReviews } from '@/apis/profile/useGetReviews';
import { ProfileComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/MainTab/ProfileStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export function ProfileContainer() {
  const { userId: otherId } = useRoute<RootRouteProps<'Profile'>>().params ?? {};
  const { userId: myId } = useAppSelector(state => state.auth);
  const userId = otherId || myId!;
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const toast = useRef<Toast>(null);
  const { profileInfoData, refetch, loading: profileLoading } = useGetProfileInfo({ userId: userId });
  const { data: flagData, loading: flagLoading, refetch: flagRefetch } = useGetFlags(userId);
  const isLoading = profileLoading || flagLoading;
  const [buttonType, setButtonType] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const onItemClick = (item: any) => () => {
    if (item?.bakeryImageList?.length === 0) {
      if (myId === otherId || otherId === undefined) {
        toast.current?.show('저장된 빵집이 없어요. 빵집을 추가해주세요!');
      } else {
        toast.current?.show('저장된 빵집이 없어요');
      }
    } else {
      navigation.push('ProfileStack', {
        screen: 'ListDetail',
        params: {
          flagId: item?.flagInfo?.id,
          name: item?.flagInfo?.name,
          color: item?.flagInfo?.color,
          isMe: otherId ? false : true,
        },
      });
    }
  };

  const onClickUpdateButton = () => {
    navigation.push('ProfileStack', {
      screen: 'EditProfile',
      params: {
        userImage: profileInfoData?.userImage,
        nickName: profileInfoData?.nickName,
      },
    });
  };

  const onFollowButtonClick = async (followUserId: number) => {
    if (profileInfoData?.isFollow) {
      await unFollow({ userId: followUserId });
    } else {
      await follow({ userId: followUserId });
    }
    refetch();
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
      flagRefetch();
    }, [refetch, flagRefetch])
  );

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        const getReviewCount = async () => {
          const data = await requestGetReviews({ userId: userId, pageParam: 0 });
          setReviewCount(data?.totalElements || 0);
        };
        getReviewCount();
      }
    }, [userId])
  );

  return (
    <>
      <ProfileComponent
        profileInfoData={profileInfoData}
        flagData={flagData}
        loading={isLoading}
        buttonType={buttonType}
        setButtonType={setButtonType}
        onItemClick={onItemClick}
        onClickUpdateButton={onClickUpdateButton}
        onFollowButtonClick={onFollowButtonClick}
        myId={myId}
        userId={userId}
        otherId={otherId}
        reviewCount={reviewCount}
      />
      <Toast ref={toast} />
    </>
  );
}
