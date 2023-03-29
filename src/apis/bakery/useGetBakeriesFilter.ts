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

const useGetBakeriesFilter = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  sort,
  filter = false,
}: UseGetBakeriesProps) => {
  const queryKey = ['useGetBakeriesFilter'] as const;

  const { data, isLoading, isError, refetch } = useQuery(
    queryKey,
    () => requestGetBakeriesFilter({ latitude, longitude, latitudeDelta, longitudeDelta, sort }),
    { enabled: filter }
  );

  return {
    bakeries: data,
    loading: isLoading,
    error: isError,
    refetch,
  };
};

export { useGetBakeriesFilter };
