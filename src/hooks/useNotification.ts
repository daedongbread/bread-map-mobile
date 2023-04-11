import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/redux';
import { initNotification } from '@/utils/notification';

export const useNotification = () => {
  useAppSelector(selector => selector.notice);

  useDispatch();

  initNotification();
};
