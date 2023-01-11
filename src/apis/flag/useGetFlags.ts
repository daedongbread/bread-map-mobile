import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { Flag } from './types';

type getFlagRes = {
  data: Flag[];
};

const getFlags = async () => {
  const { data } = await fetcher.get<getFlagRes>('/flag');

  return data.data;
};

const useGetFlags = () => {
  return useQuery(['useGetFlags'], () => getFlags());
};

export { useGetFlags };
