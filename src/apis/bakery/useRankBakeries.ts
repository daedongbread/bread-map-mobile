import { useEffect, useState } from 'react';
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
  return fetcher.get<RankBakery[]>(`/v1/bakeries/rank/${count}`);
};

export const useRankBakeries = (props?: RankBakeries) => {
  const [data, setData] = useState<RankBakery[]>();
  const count = props?.count || 5;

  // return useQuery({
  //   queryFn: () => bakeriesRank({ count }),
  //   queryKey: ['bakeries', 'rank', count],
  // });

  useEffect(() => {
    setData([
      {
        id: 600,
        name: '포레포레',
        image: 'https://d2a72lvyl71dvx.cloudfront.net/defaultImage/defaultBakery8.png',
        flagNum: 1532,
        rating: 3.2,
        shortAddress: '서울 강동구',
        isFlagged: true,
      },
      {
        id: 500,
        name: '정수제빵소',
        image: 'https://d2a72lvyl71dvx.cloudfront.net/defaultImage/defaultBakery8.png',
        flagNum: 1532,
        rating: 3.2,
        shortAddress: '서울특별시 중랑구',
        isFlagged: false,
      },
      {
        id: 100,
        name: '케이크하우스밀레 중화점',
        image: 'https://d2a72lvyl71dvx.cloudfront.net/defaultImage/defaultBakery4.png',
        flagNum: 100,
        rating: 3.7,
        shortAddress: '서울특별시 중랑구',
        isFlagged: false,
      },
    ]);
  }, []);
  return {
    data,
  };
};
