import { useAuth } from '@/hooks/useAuth';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';

export const useKakaoLoginButton = () => {
  const { logIn } = useAuth();
  const signIn = async () => {
    try {
      const userInfo: KakaoOAuthToken = await login();

      if (userInfo.idToken) {
        logIn({ token: userInfo.idToken, provider: 'KAKAO' });
      }
    } catch (error: any) {}
  };

  return { signIn };
};
