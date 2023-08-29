import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';
import { LikeEntity } from './types';

type LikeResponse = {
  data: LikeEntity;
};

const requestPostLike = async (feedId: number) => {
  const { data } = await fetcher.post<LikeResponse>(`/v1/feed/${feedId}/like`);
  return data.data;
};

export const usePostLike = () => {
  return useMutation({
    mutationFn: requestPostLike,
  });
};
