import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AppleLogo } from '@/components/Shared/Icons';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  onPress: () => void;
};

const KakaoLoginButton = ({ onPress }: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <AppleLogo style={styles.logo} />
      <Text style={styles.buttonText}>카카오 계정으로 로그인</Text>
    </View>
  </TouchableWithoutFeedback>
);

export { KakaoLoginButton };

const styles = StyleSheet.create(
  resizePixels({
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
      marginBottom: 4,
    },

    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
);
