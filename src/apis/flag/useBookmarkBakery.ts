import { useMutation, useQueryClient } from 'react-query';
import { BakeryMapBakeryFilterEntity } from '@/apis/bakery/types';
import { Flag } from '@/apis/flag/types';
import { fetcher } from '../fetcher';

type useBookmarkBakeryProps = {
  flagId: number;
  bakeryId: number;
};

const bookmarkBakery = ({ flagId, bakeryId }: useBookmarkBakeryProps) => {
  return fetcher.post<void>(`/v1/flags/${flagId}/bakeries/${bakeryId}`);
};

const useBookmarkBakery = () => {
  const queryClient = useQueryClient();

  return useMutation(['useMutationCreateFlag'], bookmarkBakery, {
    onSuccess: (data, variables) => {
      const filterBakeries: BakeryMapBakeryFilterEntity[] | undefined =
        queryClient.getQueryData('useGetBakeriesFilter');
      const flags: Flag[] | undefined = queryClient.getQueryData('useGetFlags');
      const flag = flags?.find(f => f.flagInfo.id === variables.flagId);

      const newFilterBakeries = filterBakeries?.map(bakery => {
        if (bakery.id === variables.bakeryId) {
          return {
            ...bakery,
            color: flag?.flagInfo.color,
          };
        }

        return bakery;
      });
      queryClient.setQueryData(['useGetBakeriesFilter'], newFilterBakeries);
    },
  });
};

export { useBookmarkBakery };
