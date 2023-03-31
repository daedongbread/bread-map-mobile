import { fetcher } from '../fetcher';

type Props = {
  userId: number;
};

const unFollow = async ({ userId }: Props) => {
  const resp = await fetcher({
    method: 'delete',
    url: '/v1/users/follow',
    data: {
      userId: userId,
    },
  });

  return resp;
};

export { unFollow };
