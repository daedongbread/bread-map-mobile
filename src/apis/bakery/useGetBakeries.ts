import { useQuery } from 'react-query';
import { BakeryEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetBakeriesProps = {
  sort: 'distance' | 'popular';
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const requestGetBakeries = async ({
  sort,
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
}: UseGetBakeriesProps): Promise<BakeryEntity[]> => {
  const resp = await fetcher.get<BakeryEntity[]>(
    `/bakery?sort=${sort}&latitude=${latitude}&longitude=${longitude}&latitudeDelta=${latitudeDelta}&longitudeDelta=${longitudeDelta}`
  );
  return resp.data;
};

const useGetBakeries = ({ latitude, longitude, latitudeDelta, longitudeDelta, sort }: UseGetBakeriesProps) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ['useGetBakeries', { latitude, longitude, latitudeDelta, longitudeDelta, sort }] as const,
    () => requestGetBakeries({ latitude, longitude, latitudeDelta, longitudeDelta, sort })
  );

  return {
    bakeries: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetBakeries };
