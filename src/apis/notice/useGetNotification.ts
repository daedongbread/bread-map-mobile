import { useInfiniteQuery } from 'react-query';
import { NoticeEntry } from '@/apis/notice/types';
import { fetcher } from '../fetcher';

export type GetNoticeResponse = {
  data: {
    pageNumber: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
    contents: NoticeEntry[];
  };
};

type GetNoticeProps = Required<Omit<UseGetNoticeProps, 'deviceToken'>> & Pick<UseGetNoticeProps, 'deviceToken'>;

export type UseGetNoticeProps = {
  deviceToken?: string | null;
  page?: number;
  unit?: 'today' | 'week' | 'before';
};

const getNotice = async ({ deviceToken, page, unit }: GetNoticeProps): Promise<GetNoticeResponse['data']> => {
  const { data } = await fetcher.get<GetNoticeResponse>(`/notice?${unit}?page=${page}deviceToken:${deviceToken}`);
  return data.data;
};

export const getNoticeQueryKey = (props: Omit<UseGetNoticeProps, 'page'>) => {
  return ['useGetNotice', { ...props }];
};

const useGetInfiniteNotice = ({ deviceToken, unit = 'today' }: UseGetNoticeProps) => {
  return useInfiniteQuery({
    queryKey: getNoticeQueryKey({ deviceToken, unit }),
    queryFn: ({ pageParam = 0 }) => getNotice({ deviceToken, page: pageParam, unit }),
    enabled: !!deviceToken,
    staleTime: 5000,
    getNextPageParam: (lastPage: GetNoticeResponse['data']) => {
      if (lastPage.pageNumber < lastPage.totalPages) {
        return lastPage.pageNumber + 1;
      }

      return undefined;
    },
  });
};

export { useGetInfiniteNotice };
