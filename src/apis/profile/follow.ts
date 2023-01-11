import { fetcher } from '../fetcher';

type Props = {
  userId: number;
};

const follow = async ({ userId }: Props) => {
  const resp = await fetcher({
    method: 'post',
    url: '/user/follow',
    data: {
      userId: userId,
    },
  });

  return resp;
};

export { follow };
