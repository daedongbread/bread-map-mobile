import { fetcher } from '../fetcher';

type Props = {
  accessToken: string;
  bakeryId: number;
  content: string;
  images?: string[];
};

const updateBakery = async ({ accessToken, bakeryId, content, images }: Props) => {
  const resp = await fetcher({
    method: 'post',
    url: `/v1/bakeries/${bakeryId}/bakery-update-reports`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: {
      content: content,
      images: images,
    },
  });
  return resp;
};

export { updateBakery };
