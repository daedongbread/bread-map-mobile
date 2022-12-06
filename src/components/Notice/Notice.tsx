import React from 'react';
import { NoticeEntry } from '@/apis/notice/types';
import { NoticeAvatar } from '@/components/Notice/NoticeAvatar';
import { NoticeText } from '@/components/Notice/NoticeText';
import { NoticeWrapper } from '@/components/Notice/NoticeWrapper';

interface Props {
  notice: NoticeEntry;
}

export const Notice = ({ notice }: Props) => {
  return (
    <NoticeWrapper key={notice.contentId}>
      <NoticeAvatar image={notice.image} />
      <NoticeText title={notice.title} createdAt={notice.createdAt} />
    </NoticeWrapper>
  );
};
