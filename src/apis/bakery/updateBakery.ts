import { fetcher } from '../fetcher';

type Props = {
  accessToken: string;
  bakeryId: number;
  name: string;
  location: string;
  content: string;
};

const updateBakery = async ({ accessToken, bakeryId, name, location, content }: Props) => {
  const resp = await fetcher({
    method: 'post',
    url: `/bakery/report/${bakeryId}/update`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: {
      name: name,
      location: location,
      content: content,
    },
  });
  return resp;
};

export { updateBakery };
