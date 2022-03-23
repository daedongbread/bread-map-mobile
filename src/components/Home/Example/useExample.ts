import { useGetBakeries } from '@/apis';

export const useExample = () => {
  const data = { latitude: 37.6799006, longitude: 127.0549781, range: 100000 };
  const { bakeries, loading } = useGetBakeries(data);

  return {
    loading,
    bakeries,
  };
};
