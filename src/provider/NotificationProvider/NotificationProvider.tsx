import React, { FC, useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateDeviceToken } from '@/slices/notification';
import { notification } from '@/utils/notification';
import messaging from '@react-native-firebase/messaging';

const NotificationProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const [isRequesting, setIsRequesting] = useState(true);

  const setDeviceToken = useCallback(async () => {
    let enabled = true;

    if (Platform.OS === 'ios') {
      // IOS의 경우 권한체크
      enabled = await notification().requestPermission();
    } else if (Platform.OS === 'android') {
      // ANDROID의 경우 채널생성
      notification().createChannel();
    }

    if (enabled) {
      const token = await notification().getDeviceToken();
      dispatch(updateDeviceToken(token));
    }

    setIsRequesting(false);
  }, [dispatch]);

  // 푸시서버 구독
  useEffect(() => {
    setDeviceToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (!remoteMessage.notification) {
        return;
      }

      if (Platform.OS === 'ios') {
        notification().showIOSNotification(remoteMessage.notification, remoteMessage.data);
      } else if (Platform.OS === 'android') {
        notification().showANDROIDNotification(remoteMessage.notification, remoteMessage.data);
      }
    });

    return unsubscribe;
  }, [setDeviceToken]);

  if (isRequesting) {
    return null;
  }

  return <>{children}</>;
};

export { NotificationProvider };
