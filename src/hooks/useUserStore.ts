import { useSelector } from 'react-redux';
import { RootState } from '@/slices';

export const useUserStore = () => {
  return useSelector((state: RootState) => state.user);
};
