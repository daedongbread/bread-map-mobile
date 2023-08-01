import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { FeedDetail } from './types';

type FeedDetailResponse = {
  data: FeedDetail;
};

const requestGetAllFeeds = async (feedId: number) => {
  const { data } = await fetcher.get<FeedDetailResponse>(`/v1/feed/${feedId}?feedType=curation`);
  return data.data;
};

const useGetCurationFeedDetail = (feedId: number) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetCurationFeedDetail', { feedId }], () =>
    requestGetAllFeeds(feedId)
  );

  return {
    feedDetail: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetCurationFeedDetail };
