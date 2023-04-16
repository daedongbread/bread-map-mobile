import { useAuth } from '@/hooks/useAuth';
import appleAuth from '@invertase/react-native-apple-authentication';

export const useAppleLoginButton = () => {
  const { logIn } = useAuth();

  const signIn = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    if (credentialState === appleAuth.State.AUTHORIZED && appleAuthRequestResponse.identityToken) {
      logIn({ token: appleAuthRequestResponse.identityToken, provider: 'apple' });
    }

    // if (credentialState === appleAuth.State.NOT_FOUND) {
    // } else if (credentialState === appleAuth.State.REVOKED) {
    // } else if (credentialState === appleAuth.State.TRANSFERRED) {
    // }
  };

  return { signIn };
};
