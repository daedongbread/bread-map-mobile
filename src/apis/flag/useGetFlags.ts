import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { Flag } from './types';

type getFlagRes = {
  data: Flag[];
};

const getFlags = async (userId?: number | null) => {
  const { data } = await fetcher.get<getFlagRes>(`/flag/user/${userId}`);

  return data.data;
};

const useGetFlags = (userId: number | null) => {
  return useQuery(['useGetFlags'], () => getFlags(userId), {
    enabled: userId !== null,
  });
};

export { useGetFlags };
