import { fetcher } from '../fetcher';

type Props = {
  accessToken: string;
  bakeryId: number;
  content: string;
};

const updateBakery = async ({ accessToken, bakeryId, content }: Props) => {
  const resp = await fetcher({
    method: 'post',
    url: `/v1/bakeries/${bakeryId}/bakery-update-reports`,
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
