import { useQuery } from 'react-query';
import { BakerySingleEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetBakeryProps = {
  bakeryId: number;
};

type GetBakeryResponse = {
  data: BakerySingleEntity;
};

const requestGetBakery = async ({ bakeryId }: UseGetBakeryProps) => {
  const resp = await fetcher.get<GetBakeryResponse>(`/bakery/${bakeryId}`);
  return resp.data.data;
};

const useGetBakery = ({ bakeryId }: UseGetBakeryProps) => {
  const { data, isLoading, isError, refetch } = useQuery(['useGetBakery', { bakeryId }], () =>
    requestGetBakery({ bakeryId })
  );

  return {
    bakery: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetBakery };
