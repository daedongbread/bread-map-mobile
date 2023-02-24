import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type GetFlagResponse = {
  data: any;
};

const requestGetFlags = async () => {
  const resp = await fetcher.get<GetFlagResponse>('/flag');
  return resp.data.data;
};

const useGetFlags = () => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetFlag'], () => requestGetFlags());

  return {
    data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetFlags };
