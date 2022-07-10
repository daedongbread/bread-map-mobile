import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialProvider } from '@/apis/auth/requestLogin';
import { DaebbangFlag } from '@/components/Shared/Icons';
import { TitleTextLogo } from '@/components/Shared/Icons/TitleTextLogo';
import { useAuth } from '@/provider/AuthProvider/AuthProvider';
import { resizePixels } from '@/utils';
import styled from '@emotion/native';
import { Button } from '@shared/Button/Button';

const DummyAuth = () => {
  const { login } = useAuth();

  const onLogin = useCallback(
    (provider: SocialProvider) => {
      login({
        token: 'DUMMY_TOKEN',
        provider,
      });
    },
    [login]
  );

  return (
    <Container>
      <View style={styles.iconContainer}>
        <DaebbangFlag style={styles.iconSize} />
        <TitleTextLogo style={styles.titleText} />
      </View>
      <View>
        <Button onPress={() => onLogin('google')}>구글 로그인</Button>
        <Button onPress={() => onLogin('apple')}>애플 로그인</Button>
      </View>
    </Container>
  );
};

export { DummyAuth };

const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary500};
`;

//TODO: 사이즈가 고정값아니고 유연하게 진행
const styles = StyleSheet.create(
  resizePixels({
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 150,
    },
    iconSize: {
      width: 160,
      height: 119,
    },
    titleText: {
      marginTop: 12,
    },
  })
);
