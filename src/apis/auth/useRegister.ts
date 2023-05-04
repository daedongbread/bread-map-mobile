import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';
import { LoginResponse, SocialProvider } from './requestLogin';

export type PostRegisterRequest = {
  type?: SocialProvider | null;
  idToken?: string | null;
  isTermsOfServiceAgreed: boolean;
  isPersonalInfoCollectionAgreed: boolean;
  isMarketingInfoReceptionAgreed: boolean;
};

const postRegister = async (request: PostRegisterRequest) => {
  const { data } = await fetcher.post<LoginResponse>('/v1/auth/register', request);
  return data.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: postRegister,
  });
};
