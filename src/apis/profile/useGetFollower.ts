import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type UseGetFollowerProps = {
  enabled: boolean;
  userId: number;
};

type GetFollowerResponse = {
  data: any;
};

const requestGetFollower = async ({ userId }: { userId: number }) => {
  const resp = await fetcher.get<GetFollowerResponse>(`/v1/users/${userId ? `${userId}/` : ''}follower`);
  return resp.data.data;
};

const useGetFollower = ({ enabled, userId }: UseGetFollowerProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetFollower'], () => requestGetFollower({ userId }), {
    enabled: enabled,
  });

  return {
    followerData: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetFollower };
