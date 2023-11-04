import { Alert, Linking, Platform } from 'react-native';
import { useAlarm } from '@/apis/auth/useAlarm';
import { notification } from '@/utils/notification';

export const useNotification = () => {
  const { alarmOn, updateAlarm } = useAlarm();

  const updateAlarmToggle = async (toggle: boolean) => {
    if (toggle) {
      if (Platform.OS === 'ios') {
        const status = await notification().requestPermission();

        if (!status) {
          Alert.alert('알림을 받으려면 IOS 설정에서 알림을 켜주세요.\n시스템 설정으로 이동합니다.', '', [
            {
              text: '확인',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]);
          return;
        }
      }
    }

    const deviceToken = await notification().getDeviceToken();
    // store device token
    updateAlarm(deviceToken, toggle);
  };

  return {
    alarmOn,
    updateAlarmToggle,
  };
};
