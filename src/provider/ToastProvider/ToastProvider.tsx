import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { useDispatch } from 'react-redux';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { useAppSelector } from '@/hooks/redux';
import { hideToast } from '@/slices/toast';

/**
 * Toast를 전역으로 사용 하기 위한 Provider 입니다.
 * 사용법 dispatch(showToast({text:'', ...rest}))
 */
export const ToastProvider: React.FC = ({ children }) => {
  const ref = useRef<Toast>(null);
  const dispatch = useDispatch();
  const { isShow, duration, icon, text, position } = useAppSelector(selector => selector.toast);

  const ToastText: React.FC = () => {
    return (
      <View style={styles.container}>
        {icon && <>{icon}</>}
        <SplitColumn width={6} />
        <Text color="#FFFFFF" presets={['body2', 'semibold']}>
          {text}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    if (isShow) {
      ref.current?.show(<ToastText />, duration, () => {
        dispatch(hideToast());
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  return (
    <>
      {children}
      <Toast ref={ref} position={position} opacity={0.85} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
