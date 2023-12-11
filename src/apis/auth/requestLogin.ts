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
  deviceToken?: string;
};

type RefreshRequest = {
  accessToken: string;
  refreshToken: string;
  deviceToken: string;
};

const requestSocialLogin = async ({ token, provider, deviceToken }: LoginRequest): Promise<LoginResponse> => {
  const resp = await fetcher.post<LoginResponse>('/v1/auth/login', {
    idToken: token,
    type: provider,
    deviceToken,
  });
  return resp.data;
};

const requestRefresh = async ({ accessToken, refreshToken, deviceToken }: RefreshRequest) => {
  const { data } = await fetcher.post<LoginResponse>('/v1/auth/reissue', {
    accessToken,
    refreshToken,
    deviceToken,
  });

  return data;
};

export { requestSocialLogin, requestRefresh };
