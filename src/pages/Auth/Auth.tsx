import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KakaoLoginButton, GoogleLoginButton } from '@/components/Auth';
import { DaebbangFlag } from '@/components/Shared/Icons';
import { TitleTextLogo } from '@/components/Shared/Icons/TitleTextLogo';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';

type Navigation = RootStackScreenProps<'Auth'>['navigation'];

const Auth = () => {
  const navigation = useNavigation<Navigation>();

  const navigateAuthWebView = (type: RootStackParamList['AuthWebView']['type']) => {
    navigation.push('AuthWebView', {
      type,
    });
  };

  const onPressGoogle = () => {
    navigateAuthWebView('google');
  };

  const onPressKakao = () => {
    navigateAuthWebView('kakao');
  };

  return (
    <Container>
      <View style={styles.iconContainer}>
        <DaebbangFlag style={styles.iconSize} />
        <TitleTextLogo style={styles.titleText} />
      </View>
      <View>
        <View style={{ marginBottom: 12 }}>
          <GoogleLoginButton onPress={onPressGoogle} />
        </View>
        <View>
          <KakaoLoginButton onPress={onPressKakao} />
        </View>
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
