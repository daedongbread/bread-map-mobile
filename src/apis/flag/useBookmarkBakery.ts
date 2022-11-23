import { useMutation } from 'react-query';
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
  return useMutation(['useMutationCreateFlag'], bookmarkBakery(args.flagId));
};

export { useBookmarkBakery };
