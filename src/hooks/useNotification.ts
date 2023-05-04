import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAlarm } from '@/apis/auth/useAlarm';
import { updateDeviceToken } from '@/slices/notice';
import { notification } from '@/utils/notification';

export const useNotification = () => {
  const dispatch = useDispatch();

  const { alarmOn, updateAlarm } = useAlarm();

  const getDeviceToken = useCallback(() => {
    notification().getDeviceToken(token => {
      if (!token) {
        return;
      }

      updateAlarm(token);
      dispatch(updateDeviceToken(token));
    });
  }, [dispatch, updateAlarm]);

  const clearDeviceToken = useCallback(() => {
    getDeviceToken();
  }, [getDeviceToken]);

  return {
    alarmOn,
    getDeviceToken,
    clearDeviceToken,
  };
};
