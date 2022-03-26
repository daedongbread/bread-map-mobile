import { fetcher } from '../fetcher';

export type SocialProvider = 'google' | 'kakao' | 'apple';

export type LoginResponse = {
  appToken: string;
  isNewMember: boolean;
};

export type LoginRequest = {
  accessToken: string;
  provider: SocialProvider;
};

const requestSocialLogin = async ({ accessToken, provider }: LoginRequest): Promise<LoginResponse> => {
  const resp = await fetcher.post<LoginResponse>(
    `/auth/${provider}`,
    {
      accessToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return resp.data;
};

const requestRefresh = async () => {
  const { data } = await fetcher.get<LoginResponse>('/auth/refresh');

  return data;
};

export { requestSocialLogin, requestRefresh };
