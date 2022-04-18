import { useGetBakeries } from '@/apis';

export const useExample = ({ moveFn }: { moveFn: () => void }) => {
  const data = { latitude: 37.6799006, longitude: 127.0549781, range: 100000 };
  const { bakeries, loading } = useGetBakeries(data);

  return {
    moveFn,
    loading,
    bakeries,
  };
};
