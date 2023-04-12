import React, { ReactNode } from 'react';
import { Alert, Linking, SwitchProps, TouchableOpacityProps } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { SettingList } from '@/components/Setting/SettingList';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';
export interface SettingItem {
  type: 'section' | 'item';
  label: string;
  subLabel?: string;
  right?: ReactNode;
  action: 'toggle' | 'navigate' | 'none';
  switchProps?: SwitchProps;
  onPress?: TouchableOpacityProps['onPress'];
}

export interface SettingDivider {
  type: 'divide';
}

export const Setting = () => {
  const navigation = useNavigation<MainStackScreenProps<'SettingModal'>['navigation']>();
  const { logOut } = useAuth();
  const { alarmOn, getDeviceToken, clearDeviceToken } = useNotification();

  const onChangeNotice = (value: boolean) => {
    if (value) {
      getDeviceToken();

      return;
    }
    clearDeviceToken();
  };

  return (
    <SettingList
      isEnableNotice={alarmOn === true}
      onChangeEnableNotice={onChangeNotice}
      logout={logOut}
      onPressDeleteAccount={() => navigation.push('DeleteAccountModal')}
      appVersion={VersionCheck.getCurrentVersion()}
      onPressPrivacyTerm={() => Alert.alert('navigate 개인정보 처리방침')}
      onPressServiceTerm={() => Alert.alert('navigate 서비스 이용약관')}
      onPressBlackList={() => navigation.push('BlockListModal')}
      onPressAnnounce={() =>
        Linking.openURL('https://www.notion.so/506fd626ec3e4e259a448c67d7d47d5f?v=df32777d315d475f96bd220ae2809a71')
      }
    />
  );
};
