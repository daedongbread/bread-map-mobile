import { useQuery } from 'react-query';
import { SearchBakeryEntity } from '@/apis/search/types';
import { fetcher } from '../fetcher';

type Params = {
  keyword: string;
  latitude?: number;
  longitude?: number;
  searchType: 'POPULAR' | 'DISTANCE' | string;
};

type Response = {
  data: SearchBakeryEntity;
};

const requestSearch = async ({ keyword, latitude, longitude, searchType }: Params) => {
  let url = `/v2/search/keyword?keyword=${keyword}&searchType=${searchType}`;
  if (latitude) {
    url += `&latitude=${latitude}`;
  }
  if (longitude) {
    url += `&longitude=${longitude}`;
  }
  const resp = await fetcher.get<Response>(url);
  return resp.data.data;
};

const useSearchBakery = ({ keyword, latitude, longitude, searchType = 'POPULAR' }: Params) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ['requestSearch', { keyword, latitude, longitude, searchType }],
    () => requestSearch({ keyword, latitude, longitude, searchType })
  );

  return {
    data: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useSearchBakery, requestSearch };
