import React, { FC, useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateDeviceToken } from '@/slices/notification';
import { notification } from '@/utils/notification';
import messaging from '@react-native-firebase/messaging';

const NotificationProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const [isRequesting, setIsRequesting] = useState(true);

  const requestPermission = useCallback(async () => {
    const enabled = await notification().requestPermission();

    if (enabled) {
      const token = await notification().getDeviceToken();
      // notification init
      dispatch(updateDeviceToken(token));
    }

    setIsRequesting(false);
  }, [dispatch]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestPermission();
    } else {
      notification().createChannel();
      setIsRequesting(false);
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (!remoteMessage.notification) {
        return;
      }

      if (Platform.OS === 'ios') {
        notification().showIOSNotification(remoteMessage.notification);
      } else if (Platform.OS === 'android') {
        notification().showANDROIDNotification(remoteMessage.notification);
      }
    });

    return unsubscribe;
  }, [requestPermission]);

  if (isRequesting) {
    return null;
  }

  return <>{children}</>;
};

export { NotificationProvider };
