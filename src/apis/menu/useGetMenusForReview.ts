import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { MenuForReviewEntity } from './type';

type GetMenusForReviewRes = {
  data: MenuForReviewEntity[];
};

type UseGetMenusForReviewProps = {
  bakeryId: number;
};

const getMenusForReview = async ({ bakeryId }: UseGetMenusForReviewProps) => {
  const { data } = await fetcher.get<GetMenusForReviewRes>(`/v1/bakeries/${bakeryId}/products/search?name=`, {});
  return data.data;
};

export const useGetMenusForReview = ({ bakeryId }: UseGetMenusForReviewProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetBreads', { bakeryId }], () =>
    getMenusForReview({ bakeryId })
  );

  return {
    menus: data,
    isLoading,
    isError,
    refetch,
  };
};
