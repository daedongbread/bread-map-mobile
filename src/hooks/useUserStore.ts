import { useSelector } from 'react-redux';
import { get } from '@/slices';

export const useUserStore = () => {
  return useSelector(get('user'));
};
