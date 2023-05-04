import { fetcher } from '../fetcher';

type Props = {
  userId: number;
};

const follow = async ({ userId }: Props) => {
  const resp = await fetcher({
    method: 'post',
    url: '/v1/users/follow',
    data: {
      userId: userId,
    },
  });

  return resp;
};

export { follow };
