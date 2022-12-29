import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type UseGetFollowingProps = {
  accessToken: string;
  enabled: boolean;
  userId: number;
};

type GetFollowingResponse = {
  data: any;
};

const requestGetFollower = async ({ accessToken, userId }: UseGetFollowingProps) => {
  const resp = await fetcher.get<GetFollowingResponse>(`/user/${userId ? `${userId}/` : ''}following`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data.data;
};

const useGetFollowing = ({ accessToken, enabled, userId }: UseGetFollowingProps) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ['useGetFollowing', { accessToken }],
    () => requestGetFollower({ accessToken, enabled, userId }),
    {
      enabled: enabled,
    }
  );

  return {
    followingData: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetFollowing };
