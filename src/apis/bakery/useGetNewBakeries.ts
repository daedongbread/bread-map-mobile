import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';

export type NewBakery = {
  id: number;
  image: string;
  name: string;
  pioneerId: number;
  pioneerNickname: string | null;
  pioneerProfileImage: string;
  shortAddress: string;
  content: string | null;
  isFlagged: boolean;
  isFollowed: boolean;
};

type GetBakeryResponse = {
  data: NewBakery[];
};

const requestGetBakery = async () => {
  const resp = await fetcher.get<GetBakeryResponse>('/v1/bakeries/new');
  return resp.data.data;
};

export const useGetNewBakeries = () => {
  const { data, refetch, ...rest } = useQuery({
    queryKey: ['newBakeries'],
    queryFn: requestGetBakery,
    enabled: true,
  });

  return {
    data,
    refetch,
    ...rest,
  };
};
