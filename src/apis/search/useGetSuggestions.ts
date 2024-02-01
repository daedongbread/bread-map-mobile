import { useQuery } from 'react-query';
import { SuggestionsEntity } from '@/apis/search/types';
import { fetcher } from '../fetcher';

type Params = {
  keyword: string;
};

type Response = {
  data: SuggestionsEntity;
};

const requestGetSuggestions = async ({ keyword }: Params) => {
  const resp = await fetcher.get<Response>(`/v2/search/suggestions?keyword=${keyword}`);
  return resp.data.data;
};

const useGetSuggestions = ({ keyword }: Params) => {
  const { data, isLoading, isError, refetch } = useQuery(['requestGetSuggestions', { keyword }], () =>
    requestGetSuggestions({ keyword })
  );

  return {
    data: data?.keywordSuggestions,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetSuggestions, requestGetSuggestions };
