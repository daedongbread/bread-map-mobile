import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/redux';
import { updateDeviceToken } from '@/slices/notice';
import { initNotification } from '@/utils/notification';

export const useNotification = () => {
  const { deviceToken } = useAppSelector(selector => selector.notice);

  const dispatch = useDispatch();

  initNotification({
    onRegister({ token }) {
      if (deviceToken !== token) {
        dispatch(updateDeviceToken(token));
      }
    },
  });
};
