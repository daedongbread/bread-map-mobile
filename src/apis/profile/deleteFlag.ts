import { fetcher } from '../fetcher';

type Props = {
  accessToken: string;
  flagId: number;
};

const deleteFlag = async ({ accessToken, flagId }: Props) => {
  const resp = await fetcher({
    method: 'delete',
    url: `/flag/${flagId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return resp;
};

export { deleteFlag };
