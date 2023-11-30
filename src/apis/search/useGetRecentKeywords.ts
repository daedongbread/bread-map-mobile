import { useQuery } from 'react-query';
import { RecentKeywordsEntity } from '@/apis/search/types';
import { fetcher } from '../fetcher';

type Response = {
  data: RecentKeywordsEntity;
};

const requestGetRecentKeywords = async () => {
  const resp = await fetcher.get<Response>('/v2/search/recent');
  return resp.data.data;
};

const useGetRecentKeywords = () => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetRecentKeywords'], () => requestGetRecentKeywords());

  return {
    data: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetRecentKeywords, requestGetRecentKeywords };
