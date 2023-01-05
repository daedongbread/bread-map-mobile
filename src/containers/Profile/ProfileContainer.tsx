import React, { useCallback, useEffect, useRef, useState } from 'react';
import { follow, unFollow, useGetProfileInfo } from '@/apis/profile';
import { ProfileComponent } from '@/components/Profile';
import { useAppSelector } from '@/hooks/redux';
import Toast from 'react-native-easy-toast';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { RootRouteProps } from '@/pages/MainStack/ProfileStack/Stack';

export function ProfileContainer() {
  const { userId } = useRoute<RootRouteProps<'Profile'>>().params ?? {};
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const toast = useRef<Toast>(null);
  const { accessToken } = useAppSelector(state => state.auth);
  const { profileInfoData, loading, refetch } = useGetProfileInfo({
    accessToken: accessToken || '',
    type: userId ? userId : 'me',
  });
  const [buttonType, setButtonType] = useState(0);

  const onItemClick = (item: any) => () => {
    if (item?.flagImageList?.length === 0) {
      toast.current?.show('저장된 빵집이 없어요. 빵집을 추가해주세요!');
    } else {
      navigation.push('ProfileStack', {
        screen: 'ListDetail',
        params: {
          flagId: item?.flagId,
          name: item?.name,
          len: item?.flagImageList?.length,
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
      const response = await unFollow({ accessToken: accessToken!!, userId: userId });
      console.log(response);
    } else {
      const response = await follow({ accessToken: accessToken!!, userId: userId });
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
        loading={loading}
        buttonType={buttonType}
        setButtonType={setButtonType}
        onItemClick={onItemClick}
        onClickUpdateButton={onClickUpdateButton}
        onFollowButtonClick={onFollowButtonClick}
        userId={userId}
      />
      <Toast ref={toast} />
    </>
  );
}
