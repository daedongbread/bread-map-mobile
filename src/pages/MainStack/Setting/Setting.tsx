import React, { ReactNode } from 'react';
import { Linking, SwitchProps, TouchableOpacityProps } from 'react-native';
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
      onPressPrivacyTerm={() =>
        Linking.openURL('https://sugared-chamomile-e10.notion.site/5c8f1341bc6d473ba0c9f5dc57a9f734')
      }
      onPressServiceTerm={() =>
        Linking.openURL('https://sugared-chamomile-e10.notion.site/111c09f9f3784d80afd2abe353224e50')
      }
      onPressBlackList={() => navigation.push('BlockListModal')}
      onPressAnnounce={() =>
        Linking.openURL('https://www.notion.so/506fd626ec3e4e259a448c67d7d47d5f?v=df32777d315d475f96bd220ae2809a71')
      }
    />
  );
};
