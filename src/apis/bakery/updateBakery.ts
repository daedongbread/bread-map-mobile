import { fetcher } from '../fetcher';

type Props = {
  accessToken: string;
  bakeryId: number;
  content: string;
};

const updateBakery = async ({ accessToken, bakeryId, content }: Props) => {
  console.log(bakeryId, content);

  const resp = await fetcher({
    method: 'post',
    url: `/bakery/report/${bakeryId}/update`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: {
      content: content,
    },
  });
  return resp;
};

export { updateBakery };
