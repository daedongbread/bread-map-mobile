import React, { useCallback, useRef, useState } from 'react';
import Toast from 'react-native-easy-toast';
import { follow, unFollow, useGetProfileInfo } from '@/apis/profile';
import { useGetFlags } from '@/apis/profile/useGetFlags';
import { ProfileComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export function ProfileContainer() {
  const { userId: otherId } = useRoute<RootRouteProps<'Profile'>>().params ?? {};
  const { userId: myId } = useAppSelector(state => state.auth);
  const userId = otherId || myId!;
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const toast = useRef<Toast>(null);
  const [buttonType, setButtonType] = useState(0);
  const { profileInfoData, loading: profileLoading, refetch } = useGetProfileInfo({ userId: userId });
  const { data: flagData, loading: flagLoading } = useGetFlags();
  const isLoading = profileLoading || flagLoading;

  const onItemClick = (item: any) => () => {
    if (item?.bakeryImageList?.length === 0) {
      toast.current?.show('저장된 빵집이 없어요. 빵집을 추가해주세요!');
    } else {
      navigation.push('ProfileStack', {
        screen: 'ListDetail',
        params: {
          flagId: item?.flagId,
          name: item?.name,
          color: item?.color,
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

  const onFollowButtonClick = async (userId: number) => {
    if (profileInfoData?.isFollow) {
      const response = await unFollow({ userId: userId });
      console.log(response);
    } else {
      const response = await follow({ userId: userId });
      console.log(response);
    }
    refetch();
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
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
        userId={userId}
        otherId={otherId}
      />
      <Toast ref={toast} />
    </>
  );
}
