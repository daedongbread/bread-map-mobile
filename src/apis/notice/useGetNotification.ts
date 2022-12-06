import { useQuery } from 'react-query';
import { NoticeEntry } from '@/apis/notice/types';
import { fetcher } from '../fetcher';

type GetBreadsRes = {
  data: {
    todayNoticeList: NoticeEntry[];
    weekNoticeList: NoticeEntry[];
    beforeNoticeList: NoticeEntry[];
  };
};

type UseGetNoticeProps = {
  deviceToken?: string | null;
};

const getNotice = async ({ deviceToken }: UseGetNoticeProps) => {
  const { data } = await fetcher.get<GetBreadsRes>(`/notice?deviceToken:${deviceToken}`);
  return data.data;
};

const useGetNotice = ({ deviceToken }: UseGetNoticeProps) => {
  return useQuery(['useGetNotice', { deviceToken }], () => getNotice({ deviceToken }), {
    enabled: !!deviceToken,
  });
};

export { useGetNotice };
