import { fetcher } from '../fetcher';

interface DeleteAccountRequest {
  accessToken: string;
  refreshToken: string;
  deviceToken: string;
}

export const requestDeleteAccount = async ({ accessToken, deviceToken, refreshToken }: DeleteAccountRequest) => {
  const resp = await fetcher.delete('/v1/auth', {
    data: {
      accessToken,
      refreshToken,
      deviceToken,
    },
  });
  return resp.data.data;
};
