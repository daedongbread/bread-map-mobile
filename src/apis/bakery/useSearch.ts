import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

export type SearchEntity = {
  bakeryId: number;
  bakeryName: number;
  reviewNum: number;
  distance: number;
};

type useSearchQuery = {
  word?: string;
  latitude?: number;
  longitude?: number;
};

const getSearch = async ({ word, latitude, longitude }: useSearchQuery): Promise<SearchEntity[]> => {
  const resp = await fetcher.get<SearchEntity[]>(
    `/search/auto?word=${word}&latitude=${latitude}&longitude=${longitude}`
  );

  return resp.data;
};

const useSearchQuery = ({ word, latitude, longitude }: useSearchQuery) => {
  return useQuery(['search', { word, latitude, longitude }] as const, () => getSearch({ word, latitude, longitude }), {
    enabled: !!(word && latitude && longitude),
  });
};

export { useSearchQuery };
