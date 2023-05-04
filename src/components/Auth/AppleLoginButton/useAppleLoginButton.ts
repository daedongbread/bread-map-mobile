import { useAuth } from '@/provider/AuthProvider/AuthProvider';
import appleAuth from '@invertase/react-native-apple-authentication';

export const useAppleLoginButton = () => {
  const { login } = useAuth();

  const signIn = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    if (credentialState === appleAuth.State.AUTHORIZED && appleAuthRequestResponse.identityToken) {
      login({ token: appleAuthRequestResponse.identityToken, provider: 'apple' });
    }

    // if (credentialState === appleAuth.State.NOT_FOUND) {
    // } else if (credentialState === appleAuth.State.REVOKED) {
    // } else if (credentialState === appleAuth.State.TRANSFERRED) {
    // }
  };

  return { signIn };
};
