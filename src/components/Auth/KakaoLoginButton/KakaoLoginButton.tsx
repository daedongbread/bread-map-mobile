import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { theme } from '@/styles/theme';
import KakaoLogo from '@shared/Icons/IcLogoKakao.svg';

type Props = {
  onPress: () => void;
};

const KakaoLoginButton = ({ onPress }: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <KakaoLogo style={styles.logo} />
      <Text style={styles.buttonText}>카카오 계정으로 로그인</Text>
    </View>
  </TouchableWithoutFeedback>
);

export { KakaoLoginButton };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#f7e317',
    width: 320,
    height: 56,
  },

  logo: {
    width: 25,
    height: 25,
    marginRight: 8,
    marginBottom: 4,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.color.gray900,
  },
});
