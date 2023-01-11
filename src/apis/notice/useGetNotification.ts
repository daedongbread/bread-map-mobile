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

type GetNoticeProps = Required<UseGetNoticeProps>;

export type UseGetNoticeProps = {
  page?: number;
  unit?: 'today' | 'week' | 'before';
};

const getNotice = async ({ page, unit }: GetNoticeProps): Promise<GetNoticeResponse['data']> => {
  const { data } = await fetcher.get<GetNoticeResponse>(`/notice/${unit}?page=${page}`);
  return data.data;
};

export const getNoticeQueryKey = (props: Omit<UseGetNoticeProps, 'page'>) => {
  return ['useGetNotice', { ...props }];
};

const useGetInfiniteNotice = ({ unit = 'today' }: UseGetNoticeProps) => {
  return useInfiniteQuery({
    queryKey: getNoticeQueryKey({ unit }),
    queryFn: args => getNotice({ page: args.pageParam, unit }),
    staleTime: 5000,
    getNextPageParam: (lastPage: GetNoticeResponse['data']) => {
      if (lastPage.pageNumber < lastPage.totalPages - 1) {
        return lastPage.pageNumber + 1;
      }

      return undefined;
    },
  });
};

export { useGetInfiniteNotice };
