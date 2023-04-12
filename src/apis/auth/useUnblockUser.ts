import { fetcher } from '@/apis/fetcher';

interface UnblockUserRequest {
  userId: number;
}
export const unblockUser = ({ userId }: UnblockUserRequest) => {
  return fetcher.delete('/v1/users/block', {
    data: {
      userId,
    },
  });
};
