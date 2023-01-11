import { fetcher } from '../fetcher';

type Props = {
  userId: number;
};

const unFollow = async ({ userId }: Props) => {
  const resp = await fetcher({
    method: 'delete',
    url: '/user/follow',
    data: {
      userId: userId,
    },
  });

  return resp;
};

export { unFollow };
