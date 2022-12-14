import { fetcher } from '@/apis/fetcher';

interface UnblockUserRequest {
  userId: number;
}
export const unblockUser = ({ userId }: UnblockUserRequest) => {
  return fetcher.delete('/user/block', {
    data: {
      userId,
    },
  });
};
