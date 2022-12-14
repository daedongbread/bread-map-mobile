import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type UseGetProfileInfoProps = {
  accessToken: string;
  type: string;
};

type GetProfileInfoResponse = {
  data: any;
};

const requestGetProfileInfo = async ({ accessToken, type }: UseGetProfileInfoProps) => {
  const resp = await fetcher.get<GetProfileInfoResponse>(`/user/${type}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data.data;
};

const useGetProfileInfo = ({ accessToken, type }: UseGetProfileInfoProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetProfileInfo', { accessToken }], () =>
    requestGetProfileInfo({ accessToken, type })
  );

  return {
    profileInfoData: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetProfileInfo };
