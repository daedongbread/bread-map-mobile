import { useQuery } from 'react-query';
import { BakeryMapBakeryFilterEntity } from '@/apis/bakery/types';
import { fetcher } from '../fetcher';

type UseGetBakeriesProps = {
  filter?: boolean;
  sort: 'distance' | 'popular';
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

type GetBakeriesResponse = {
  data: BakeryMapBakeryFilterEntity[];
};

const requestGetBakeriesFilter = async ({
  sort,
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
}: Omit<UseGetBakeriesProps, 'filter'>) => {
  const resp = await fetcher.get<GetBakeriesResponse>('/v1/bakeries', {
    params: {
      sortBy: sort,
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      filterBy: true,
    },
  });
  return resp.data.data;
};

const useGetBakeriesFilter = ({ latitude, longitude, latitudeDelta, longitudeDelta, sort }: UseGetBakeriesProps) => {
  const queryKey = ['useGetBakeriesFilter', { sort }] as const;
  const enabled = !!(latitude && longitude && latitudeDelta && longitudeDelta);

  const { data, isLoading, isError, refetch } = useQuery(
    queryKey,
    () => requestGetBakeriesFilter({ latitude, longitude, latitudeDelta, longitudeDelta, sort }),
    { enabled }
  );

  return {
    bakeries: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetBakeriesFilter };
