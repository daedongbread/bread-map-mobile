import { useAuth } from '@/provider/AuthProvider/AuthProvider';

export const useLogOutButton = () => {
  const { logOut } = useAuth();

  return { logOut };
};
