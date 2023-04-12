import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAlarm } from '@/apis/auth/useAlarm';
import { useAppSelector } from '@/hooks/redux';
import { updateDeviceToken } from '@/slices/notice';
import { notification } from '@/utils/notification';

export const useNotification = () => {
  const { deviceToken } = useAppSelector(selector => selector.notice);
  const dispatch = useDispatch();

  const { alarmOn, updateAlarm } = useAlarm();

  const getDeviceToken = useCallback(() => {
    notification().getDeviceToken(token => {
      if (!token) {
        return;
      }

      if (deviceToken !== token) {
        updateAlarm(token);
        dispatch(updateDeviceToken(token));
      }
    });
  }, [deviceToken, dispatch, updateAlarm]);

  const clearDeviceToken = useCallback(() => {
    dispatch(updateDeviceToken(null));
    updateAlarm(null);
  }, [dispatch, updateAlarm]);

  useEffect(() => {
    if (!alarmOn || deviceToken === null) {
      return;
    }

    getDeviceToken();
  }, [deviceToken, alarmOn, getDeviceToken]);

  return {
    alarmOn,
    getDeviceToken,
    clearDeviceToken,
  };
};
