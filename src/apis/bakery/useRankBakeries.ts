import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useFocusEffect } from '@react-navigation/native';
import { fetcher } from '../fetcher';

type RankBakeries = {
  count?: number;
};

export type RankBakery = {
  id: number;
  name: string;
  image: string;
  flagNum: number;
  rating: number;
  shortAddress: string;
  isFlagged: boolean;
};

const bakeriesRank = ({ count }: Required<RankBakeries>) => {
  return fetcher.get<{ data: RankBakery[] }>(`/v1/bakeries/rank/${count}`).then(el => el.data);
};

export const useRankBakeries = (props?: RankBakeries) => {
  const count = props?.count || 5;

  const { data, refetch, ...rest } = useQuery({
    queryFn: () => bakeriesRank({ count }),
    queryKey: ['bakeries', 'rank', count],
    enabled: false,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return {
    data: data?.data,
    refetch,
    ...rest,
  };
};
