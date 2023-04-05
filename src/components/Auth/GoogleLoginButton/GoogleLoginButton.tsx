import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { GoogleLogo } from '@/components/Shared/Icons';
import { theme } from '@/styles/theme';

type Props = {
  onPress: () => void;
};

const GoogleLoginButton = ({ onPress }: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <GoogleLogo style={styles.logo} />
      <Text style={styles.buttonText}>구글 계정으로 로그인</Text>
    </View>
  </TouchableWithoutFeedback>
);

export { GoogleLoginButton };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: theme.color.white,
    width: 320,
    height: 56,
  },

  logo: {
    width: 25,
    height: 25,
    marginRight: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.color.gray900,
  },
});
