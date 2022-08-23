import { useQuery } from 'react-query';
import { SearchEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type GetResultResult = {
  data: SearchEntity[];
};

type useSearchQuery = {
  word?: string;
  latitude?: number;
  longitude?: number;
};

const getSearch = async ({ word, latitude, longitude }: useSearchQuery): Promise<SearchEntity[]> => {
  const resp = await fetcher.get<GetResultResult>(
    `/search/auto?word=${word}&latitude=${latitude}&longitude=${longitude}`
  );

  return resp.data.data;
};

const useSearchQuery = ({ word, latitude, longitude }: useSearchQuery) => {
  return useQuery(['search', { word, latitude, longitude }] as const, () => getSearch({ word, latitude, longitude }), {
    enabled: !!(word && latitude && longitude),
  });
};

export { useSearchQuery };
