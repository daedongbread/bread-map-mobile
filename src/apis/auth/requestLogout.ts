import { fetcher } from '../fetcher';

export interface LogoutRequest {
  accessToken: string;
  refreshToken: string;
  deviceToken: string;
}

export const requestLogout = ({ accessToken, refreshToken, deviceToken }: LogoutRequest) => {
  return fetcher.post('/user/logout', {
    accessToken,
    refreshToken,
    deviceToken,
  });
};
