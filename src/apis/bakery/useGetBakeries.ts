import { useQuery } from 'react-query';
import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetBakeriesProps = {
  sort: 'distance' | 'popular';
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

type GetBakeriesResponse = {
  data: BakeryMapBakeryEntity[];
};

const requestGetBakeries = async ({
  sort,
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
}: UseGetBakeriesProps) => {
  const resp = await fetcher.get<GetBakeriesResponse>(
    `/bakery?sortBy=${sort}&latitude=${latitude}&longitude=${longitude}&latitudeDelta=${latitudeDelta}&longitudeDelta=${longitudeDelta}`
  );
  return resp.data.data;
};

const useGetBakeries = ({ latitude, longitude, latitudeDelta, longitudeDelta, sort }: UseGetBakeriesProps) => {
  const queryKey = ['useGetBakeries', { latitude, longitude, latitudeDelta, longitudeDelta, sort }] as const;

  const { data, isLoading, isError, refetch } = useQuery(
    queryKey,
    () => requestGetBakeries({ latitude, longitude, latitudeDelta, longitudeDelta, sort }),
    { enabled: !!(latitude && longitude) }
  );

  return {
    bakeries: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetBakeries };
