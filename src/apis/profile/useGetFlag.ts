import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type UseGetFlagProps = {
  accessToken: string;
  flagId: number;
};

type GetFlagResponse = {
  data: any;
};

const requestGetFlag = async ({ accessToken, flagId }: UseGetFlagProps) => {
  const resp = await fetcher.get<GetFlagResponse>(`/flag/${flagId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data.data;
};

const useGetFlag = ({ accessToken, flagId }: UseGetFlagProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetFlag', flagId], () =>
    requestGetFlag({ accessToken, flagId })
  );

  return {
    data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetFlag };
