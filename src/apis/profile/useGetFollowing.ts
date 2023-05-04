import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

type UseGetFollowingProps = {
  enabled: boolean;
  userId: number;
};

type GetFollowingResponse = {
  data: any;
};

const requestGetFollower = async ({ userId }: { userId: number }) => {
  const resp = await fetcher.get<GetFollowingResponse>(`/v1/users/${userId ? `${userId}/` : ''}following`);
  return resp.data.data;
};

const useGetFollowing = ({ enabled, userId }: UseGetFollowingProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetFollowing'], () => requestGetFollower({ userId }), {
    enabled: enabled,
  });

  return {
    followingData: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetFollowing };
