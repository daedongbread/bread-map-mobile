import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { BreadEntity } from './types';

type GetBreadsRes = {
  data: BreadEntity[];
};

type UseGetBreadsProps = {
  bakeryId: number;
};

const getBreads = async ({ bakeryId }: UseGetBreadsProps) => {
  const { data, config } = await fetcher.get<GetBreadsRes>(`/bakery/${bakeryId}/review/bread`);
  return data.data;
};

const useGetBreads = ({ bakeryId }: UseGetBreadsProps) => {
  return useQuery(['useGetBreads', { bakeryId }], () => getBreads({ bakeryId }));
};

export { useGetBreads };
