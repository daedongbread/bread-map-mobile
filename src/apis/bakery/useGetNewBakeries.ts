import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useFocusEffect } from '@react-navigation/native';
import { fetcher } from '../fetcher';

type NewBakery = {
  id: number;
  image: string | null;
  name: string;
  pioneerId: number | null;
  pioneerNickname: string | null;
  pioneerProfileImage: string | null;
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
    enabled: false,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return {
    data,
    refetch,
    ...rest,
  };
};
