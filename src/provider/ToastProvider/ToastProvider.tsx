import React, { useEffect, useRef } from 'react';
import Toast from 'react-native-easy-toast';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/redux';
import { hideToast } from '@/slices/toast';

/**
 * Toast를 전역으로 사용 하기 위한 Provider 입니다.
 * 사용법 dispatch(showToast({text:''}))
 */
export const ToastProvider: React.FC = ({ children }) => {
  const ref = useRef<Toast>(null);
  const dispatch = useDispatch();
  const { isShow, duration, text, position } = useAppSelector(selector => selector.toast);

  useEffect(() => {
    if (isShow) {
      ref.current?.show(text, duration, () => {
        dispatch(hideToast());
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  return (
    <>
      {children}
      <Toast ref={ref} position={position} />
    </>
  );
};
