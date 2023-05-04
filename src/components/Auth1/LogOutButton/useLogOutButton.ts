import { useAuth } from '@/hooks/useAuth';

export const useLogOutButton = () => {
  const { logOut } = useAuth();

  return { logOut };
};
