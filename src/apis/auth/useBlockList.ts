import { useQuery } from 'react-query';
import { fetcher } from '@/apis/fetcher';

export interface BlockListEntry {
  userId: number;
  userImage: string | null;
  nickName: string;
  reviewNum: number;
  followerNum: number;
}

const getBlockList = async () => {
  const { data } = await fetcher.get<{ data: BlockListEntry[] }>('/v1/users/block');

  return data.data;
};

export const useGetBlockList = () => {
  return useQuery({
    queryFn: getBlockList,
    queryKey: ['useGetBlockList'],
  });
};
