import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';

type UseBookmarkDisableBakeryProps = {
  flagId: number;
  bakeryId: number;
};

const bookmarkDisable = ({ flagId, bakeryId }: UseBookmarkDisableBakeryProps) => {
  return fetcher.delete<void>(`/flag/${flagId}/bakery/${bakeryId}`);
};

export const useBookmarkDisableBakery = () => {
  return useMutation(['useMutationDisableBakery'], bookmarkDisable);
};
