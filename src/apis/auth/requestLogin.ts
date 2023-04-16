import { fetcher } from '../fetcher';

export type SocialProvider = 'GOOGLE' | 'KAKAO' | 'APPLE';

export type LoginResponse = {
  data: {
    userId: number;
    accessToken: string;
    refreshToken: string;
    accessTokenExpired: number;
  };
};

export type LoginRequest = {
  token: string;
  provider: SocialProvider;
};

type RefreshRequest = {
  accessToken: string;
  refreshToken: string;
};

const requestSocialLogin = async ({ token, provider }: LoginRequest): Promise<LoginResponse> => {
  const resp = await fetcher.post<LoginResponse>(
    '/v1/auth/login',
    {
      idToken: token,
      oauthType: provider,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return resp.data;
};

const requestRefresh = async ({ accessToken, refreshToken }: RefreshRequest) => {
  const { data } = await fetcher.post<LoginResponse>('/v1/auth/reissue', {
    accessToken,
    refreshToken,
  });

  return data;
};

export { requestSocialLogin, requestRefresh };
