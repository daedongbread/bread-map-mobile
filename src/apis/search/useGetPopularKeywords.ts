import { useQuery } from 'react-query';
import { PopularKeywordsEntity } from '@/apis/search/types';
import { fetcher } from '../fetcher';

type Response = {
  data: PopularKeywordsEntity;
};

const requestGetPopularKeywords = async () => {
  const resp = await fetcher.get<Response>('/v2/search/rank');
  return resp.data.data;
};

const useGetPopularKeywords = () => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetPopularKeywords'], () => requestGetPopularKeywords());

  return {
    popularKeywords: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetPopularKeywords, requestGetPopularKeywords };
