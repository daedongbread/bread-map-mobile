import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type UseGetProfileInfoProps = {
  userId: number;
};

type GetProfileInfoResponse = {
  data: any;
};

const requestGetProfileInfo = async ({ userId }: UseGetProfileInfoProps) => {
  const resp = await fetcher.get<GetProfileInfoResponse>(`/user/${userId}`);
  return resp.data.data;
};

const useGetProfileInfo = ({ userId }: UseGetProfileInfoProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetProfileInfo'], () =>
    requestGetProfileInfo({ userId })
  );

  return {
    profileInfoData: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetProfileInfo };
