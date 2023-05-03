import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppleLoginButton, GoogleLoginButton } from '@/components/Auth1';
import { KakaoLoginButton } from '@/components/Auth1/KakaoLoginButton';
import { DaebbangFlag } from '@/components/Shared/Icons';
import { TitleTextLogo } from '@/components/Shared/Icons/TitleTextLogo';
import { SplitRow } from '@/components/Shared/SplitSpace';
import styled from '@emotion/native';

const Auth = () => {
  return (
    <Container>
      <View style={styles.iconContainer}>
        <DaebbangFlag style={styles.iconSize} />
        <SplitRow height={15} />
        <TitleTextLogo style={styles.titleText} />
      </View>
      <View>
        <KakaoLoginButton />
        <GoogleLoginButton />
        {Platform.OS === 'ios' && <AppleLoginButton />}
      </View>
    </Container>
  );
};

export { Auth };

const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary500};
`;

//TODO: 사이즈가 고정값아니고 유연하게 진행
const styles = StyleSheet.create({
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
});
