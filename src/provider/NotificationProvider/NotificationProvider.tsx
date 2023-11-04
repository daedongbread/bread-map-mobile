import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDeviceToken } from '@/slices/notification';
import { notification } from '@/utils/notification';

const NotificationProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const [isRequesting, setIsRequesting] = useState(true);

  const requestPermission = useCallback(async () => {
    const enabled = await notification().requestPermission();

    if (enabled) {
      const token = await notification().getDeviceToken();
      // notification init
      dispatch(updateDeviceToken(token));
      setIsRequesting(false);
    }
  }, [dispatch]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (isRequesting) {
    return null;
  }

  return <>{children}</>;
};

export { NotificationProvider };
