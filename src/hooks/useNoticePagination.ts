import { useQueryClient } from 'react-query';
import {
  getNoticeQueryKey,
  GetNoticeResponse,
  useGetInfiniteNotice,
  UseGetNoticeProps,
} from '@/apis/notice/useGetNotification';

type Props = Omit<UseGetNoticeProps, 'page'>;

export const useNoticePagination = (props: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading, hasNextPage, fetchNextPage } = useGetInfiniteNotice({ ...props });

  const onUpdateFollow = (userId: number) => {
    queryClient.setQueryData<GetNoticeResponse['data'] | undefined>(getNoticeQueryKey(props), old => {
      if (!old) {
        return;
      }

      return {
        ...old,
        contents: old?.contents.map(content => {
          if (content.fromUserId === userId && content.noticeType === 'FOLLOW') {
            return {
              ...content,
              isFollow: true,
            };
          }

          return content;
        }),
      };
    });
  };

  return {
    data: data?.pages.flatMap(page => page.contents),
    isLoading,
    hasNext: hasNextPage,
    onNextPage: fetchNextPage,
    onUpdateFollow,
  };
};
