import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type UseGetFollowerProps = {
  accessToken: string;
  enabled: boolean;
  userId: number;
};

type GetFollowerResponse = {
  data: any;
};

const requestGetFollower = async ({ accessToken, userId }: UseGetFollowerProps) => {
  const resp = await fetcher.get<GetFollowerResponse>(`/user/${userId ? `${userId}/` : ''}follower`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data.data;
};

const useGetFollower = ({ accessToken, enabled, userId }: UseGetFollowerProps) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ['useGetFollower', { accessToken }],
    () => requestGetFollower({ accessToken, enabled, userId }),
    {
      enabled: enabled,
    }
  );

  return {
    followerData: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetFollower };
