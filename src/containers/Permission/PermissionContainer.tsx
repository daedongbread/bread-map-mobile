import React from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { PermissionComponent } from '@/components/Permission';
import { NavigationIcon } from '@/components/Shared/Icons';
import { CameraIcon } from '@/components/Shared/Icons/Camera';
import { PolicyStackNavigationProps } from '@/pages/Policy/Stack';
import { theme } from '@/styles/theme';
import { storage } from '@/utils/storage/storage';
import { useNavigation } from '@react-navigation/core';

type Navigation = PolicyStackNavigationProps<'Permission'>['navigation'];

type Permission = {
  icon: React.ReactNode;
  title: string;
  subTitle: string;
};

const permissions: Permission[] = [
  {
    icon: <NavigationIcon width={20} height={20} color={theme.color.gray900} strokeWidth={2} />,
    title: '위치 정보 엑세스 권한',
    subTitle: '가까운 위치의 빵집을 찾기 위해\n현재 위치 정보가 필요합니다.',
  },
  {
    icon: <CameraIcon width={20} height={20} stroke={theme.color.gray900} strokeWidth={2} />,
    title: '파일 저장소 엑세스 권한',
    subTitle: '빵집 제보, 리뷰 작성할 때\n앨범 사진을 불러오기 위한 권한입니다.',
  },
];

export const PermissionContainer = () => {
  const navigation = useNavigation<Navigation>();

  const permissionsCheck = async () => {
    const platformPermissions =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

    return requestMultiple(platformPermissions);
  };

  const setPermissionChecker = () => {
    return storage.set('isPermissionChecker', 'true');
  };

  const onPressConfirm = async () => {
    await permissionsCheck();
    await setPermissionChecker();

    navigation.push('TermsStack', {
      screen: 'Terms',
    });
  };

  return <PermissionComponent permissions={permissions} onPressConfirm={onPressConfirm} />;
};
