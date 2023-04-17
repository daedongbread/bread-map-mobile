import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { bindHook, resizePixels } from '@/utils';
import styled from '@emotion/native';
import { GoogleLogo } from '@shared/Icons';
import { useGoogleLoginButton } from './useGoogleLoginButton';

const GoogleLoginButton = bindHook(useGoogleLoginButton, ({ signIn }) => (
  <View style={styles.container}>
    <Button onPress={signIn} style={styles.button}>
      <GoogleLogo style={styles.logo} />
      <Text style={styles.buttonText} color={theme.color.gray900} presets={['body1', 'bold']}>
        구글 계정으로 로그인
      </Text>
    </Button>
  </View>
));

export { GoogleLoginButton };

const Button = styled(Pressable)`
  background: ${({ theme }) => theme.color.white};
`;

const styles = StyleSheet.create(
  resizePixels({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
      width: 25,
      height: 25,
      marginRight: 8,
    },

    button: {
      marginBottom: 12,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 320,
      height: 56,
    },

    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
);
