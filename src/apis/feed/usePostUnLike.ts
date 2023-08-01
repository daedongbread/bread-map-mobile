import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';
import { LikeEntity } from './types';

type unLikeResponse = {
  data: LikeEntity;
};

const requestPostUnLike = async (feedId: number) => {
  const { data } = await fetcher.post<unLikeResponse>(`/v1/feed/${feedId}/unlike`);
  return data.data;
};

export const usePostUnLike = () => {
  return useMutation({
    mutationFn: requestPostUnLike,
  });
};
