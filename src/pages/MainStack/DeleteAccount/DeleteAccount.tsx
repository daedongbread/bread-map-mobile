import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { requestDeleteAccount } from '@/apis/auth/useDeleteAccount';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { useAppSelector } from '@/hooks/redux';
import { forceLogout } from '@/slices/auth';
import { theme } from '@/styles/theme';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';
export const DeleteAccount = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useAppSelector(selector => selector.auth);
  const { deviceToken } = useAppSelector(selector => selector.notification);

  const { mutate } = useMutation({
    mutationFn: requestDeleteAccount,
    onSuccess: () => {
      dispatch(forceLogout());
    },
  });

  const onPressDeleteButton = () => {
    if (accessToken && refreshToken) {
      mutate({
        accessToken,
        refreshToken,
        deviceToken: deviceToken || '1',
      });
    }
  };

  const labels = [
    '모든 게시물, 댓글이 삭제됩니다.',
    '계정이 삭제된 후에는 계정을 다시 살리거나 게시물, 댓글 등의 데이터를 복구할 수 없습니다.',
    '현재 계정으로 다시는 로그인할 수 없습니다.',
    '7일 동안 재가입할 수 없습니다. ',
  ];

  return (
    <SafeAreaView style={styles.flex}>
      <Header title={'탈퇴하기'} isPrevButtonShown />
      <View style={[styles.wrapper, styles.flex]}>
        <Text color={theme.color.black} presets={['subTitle1', 'bold']} style={styles.title}>
          {'잠깐만요! 탈퇴하기 전에 \n읽어보세요.'}
        </Text>
        {labels.map((label, index) => (
          <List key={index} label={label} />
        ))}
      </View>
      <View style={styles.buttonWrapper}>
        <Button size={'big'} onPress={onPressDeleteButton}>
          탈퇴하기
        </Button>
      </View>

      {insets.bottom === 0 && <SplitRow height={16} />}
    </SafeAreaView>
  );
};

export const List = (props: { label: string }) => {
  return (
    <View style={[styles.listWrapper, styles.gap]}>
      <View style={styles.middlePointWrapper}>
        <View style={styles.middlePoint} />
      </View>
      <Text color={theme.color.gray800} presets={['body2', 'semibold']}>
        {props.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 40,
  },
  title: {
    color: 'black',
    marginBottom: 20,
  },
  listWrapper: {
    flexDirection: 'row',
  },
  gap: {
    marginBottom: 16,
  },
  middlePointWrapper: {
    height: 20,
    marginRight: 8,
    justifyContent: 'center',
  },
  middlePoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.color.gray800,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
  },
});
