import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AppleLogo } from '@/components/Shared/Icons';
import { resizePixels } from '@/utils';
import styled from '@emotion/native';

type Props = {
  onPress: () => void;
};

const KakaoLoginButton = ({ onPress }: Props) => (
  <View style={styles.container}>
    <Button onPress={onPress} style={styles.button}>
      <AppleLogo style={styles.logo} />
      <Text style={styles.buttonText}>카카오 계정으로 로그인</Text>
    </Button>
  </View>
);

export { KakaoLoginButton };

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
      marginBottom: 4,
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
