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

const createNewBakeries = ({
  bakeryEntries,
  bakeryId,
  flag,
}: {
  bakeryEntries?: BakeryMapBakeryFilterEntity[];
  bakeryId: number;
  flag?: Flag;
}) => {
  return bakeryEntries?.map(bakery => {
    if (bakery.id === bakeryId) {
      return {
        ...bakery,
        color: flag?.flagInfo.color,
      };
    }

    return bakery;
  });
};

const useBookmarkBakery = () => {
  const queryClient = useQueryClient();

  return useMutation(['useMutationCreateFlag'], bookmarkBakery, {
    onSuccess: (data, variables) => {
      const flags: Flag[] | undefined = queryClient.getQueryData('useGetFlags');
      const flag = flags?.find(f => f.flagInfo.id === variables.flagId);

      queryClient.setQueryData(
        ['useGetBakeriesFilter', { sort: 'distance' }],
        createNewBakeries({
          bakeryEntries: queryClient.getQueryData(['useGetBakeriesFilter', { sort: 'distance' }]),
          flag,
          bakeryId: variables.bakeryId,
        })
      );
      queryClient.setQueryData(
        ['useGetBakeriesFilter', { sort: 'popular' }],
        createNewBakeries({
          bakeryEntries: queryClient.getQueryData(['useGetBakeriesFilter', { sort: 'popular' }]),
          flag,
          bakeryId: variables.bakeryId,
        })
      );
    },
  });
};

export { useBookmarkBakery };
