import { fetcher } from '../fetcher';

export type SocialProvider = 'google' | 'kakao' | 'apple';

export type LoginResponse = {
  data: {
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
    `/auth/${provider}`,
    {
      idToken: token,
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
  const { data } = await fetcher.post<LoginResponse>('/v1/users/auth/reissue', {
    accessToken,
    refreshToken,
  });

  return data;
};

export { requestSocialLogin, requestRefresh };
