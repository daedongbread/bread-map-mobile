import { fetcher } from '../fetcher';

type Props = {
  accessToken: string;
  userId: number;
};

const unFollow = async ({ accessToken, userId }: Props) => {
  const resp = await fetcher({
    method: 'delete',
    url: '/user/follow',
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
