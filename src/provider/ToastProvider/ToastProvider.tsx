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
    const item = { icon };

    return (
      <View style={styles.container}>
        {item.icon && (
          <>
            <item.icon width={16} height={16} />
            <SplitColumn width={6} />
          </>
        )}
        <Text style={styles.text}>{text}</Text>
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
      <Toast ref={ref} position={position} opacity={0.8} textStyle={{ opacity: 1 }} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
