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
  const { data } = await fetcher.get<GetMenusForReviewRes>(`/v1/bakeries/${bakeryId}/products?name=`, {});
  return data.data;
};

export const useGetMenusForReview = ({ bakeryId }: UseGetMenusForReviewProps) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ['useGetBreads', { bakeryId }],
    () => getMenusForReview({ bakeryId }),
    {
      select: menus => {
        return menus.map(menu => {
          return { ...menu, rating: 5 };
        });
      },
    }
  );

  return {
    menus: data,
    isLoading,
    isError,
    refetch,
  };
};
