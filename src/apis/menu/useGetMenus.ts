import { useQuery } from 'react-query';
import { fetcher } from '../fetcher';
import { MenuEntity } from './type';

type GetMenusRes = {
  data: MenuEntity[];
};

type UseGetMenusProps = {
  bakeryId: number;
};

const requestGetMenus = async (bakeryId: number) => {
  const { data } = await fetcher.get<GetMenusRes>(`/bakery/${bakeryId}/product`);
  return data.data;
};

export const useGetMenus = ({ bakeryId }: UseGetMenusProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetMenus', { bakeryId }], () =>
    requestGetMenus(bakeryId)
  );

  return {
    menus: data,
    isLoading,
    isError,
    refetch,
  };
};
