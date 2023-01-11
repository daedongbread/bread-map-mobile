import { useMutation, useQueryClient } from 'react-query';
import { fetcher } from '../fetcher';

type useBookmarkBakeryProps = {
  bakeryId: number;
};

const bookmarkBakery =
  (flagId?: number) =>
  ({ bakeryId }: useBookmarkBakeryProps) => {
    return fetcher.post<void>(`/flag/${flagId}?bakeryId=${bakeryId}`);
  };

const useBookmarkBakery = (args: { flagId?: number }) => {
  const queryClient = useQueryClient();

  return useMutation(['useMutationCreateFlag'], bookmarkBakery(args.flagId), {
    onSuccess: () => {
      queryClient.refetchQueries({
        active: true,
        queryKey: ['useGetBakeriesFilter'],
      });
    },
  });
};

export { useBookmarkBakery };
