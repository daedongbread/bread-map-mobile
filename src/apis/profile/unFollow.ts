import { fetcher } from '../fetcher';

type Props = {
  accessToken: string;
  userId: number;
};

const unFollow = async ({ accessToken, userId }: Props) => {
  const resp = await fetcher({
    method: 'delete',
    url: '/user/unfollow',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: {
      userId: userId,
    },
  });
  return resp;
};

export { unFollow };
