import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { FeedEntity } from './types';

type FeedsResponse = {
  data: Array<FeedEntity>;
};

const requestGetAllFeeds = async () => {
  const { data } = await fetcher.get<FeedsResponse>('/v1/feed/all');
  return data.data;
};

const useGetAllFeeds = () => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetAllFeeds'], requestGetAllFeeds);

  return {
    feed: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetAllFeeds };
