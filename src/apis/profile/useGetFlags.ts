import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type GetFlagResponse = {
  data: any;
};

const requestGetFlags = async (userId: number) => {
  const resp = await fetcher.get<GetFlagResponse>(`/v1/flags/users/${userId}`);
  return resp.data.data;
};

const useGetFlags = (userId: number) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetFlag'], () => requestGetFlags(userId));

  return {
    data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetFlags };
