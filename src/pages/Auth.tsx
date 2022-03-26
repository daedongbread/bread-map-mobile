import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppleLoginButton, GoogleLoginButton } from '@/components/Auth';
import { DaebbangFlag } from '@/components/Shared/Icons';
import { TitleTextLogo } from '@/components/Shared/Icons/TitleTextLogo';
import { resizePixels } from '@/utils';
import styled from '@emotion/native';

const Auth = () => (
  <Container>
    <View style={styles.iconContainer}>
      <DaebbangFlag style={styles.iconSize} />
      <TitleTextLogo style={styles.titleText} />
    </View>
    <View>
      <GoogleLoginButton />
      <AppleLoginButton />
    </View>
  </Container>
);

export { Auth };

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
