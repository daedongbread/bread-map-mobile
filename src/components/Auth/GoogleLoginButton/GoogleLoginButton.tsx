import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GoogleLogo } from '@/components/Shared/Icons';
import { bindHook, resizePixels } from '@/utils';
import styled from '@emotion/native';
import { useGoogleLoginButton } from './useGoogleLoginButton';

const GoogleLoginButton = bindHook(useGoogleLoginButton, ({ signIn }) => (
  <View style={styles.container}>
    <Button onPress={signIn} style={styles.button}>
      <GoogleLogo style={styles.logo} />
      <Text style={styles.buttonText}>구글 계정으로 로그인</Text>
    </Button>
  </View>
));

export { GoogleLoginButton };

const Button = styled(TouchableWithoutFeedback)`
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
