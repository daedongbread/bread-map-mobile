import { fetcher } from '../fetcher';
export const requestDeleteAccount = async () => {
  const resp = await fetcher.delete('/user');
  return resp.data.data;
};
