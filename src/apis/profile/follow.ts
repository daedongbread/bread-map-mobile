import { fetcher } from '../fetcher';

type Props = {
  accessToken: string;
  userId: number;
};

const follow = async ({ accessToken, userId }: Props) => {
  const resp = await fetcher({
    method: 'post',
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

export { follow };
