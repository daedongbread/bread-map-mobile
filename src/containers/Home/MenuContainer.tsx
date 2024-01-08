import React from 'react';
import { SvgProps } from 'react-native-svg';
import { MenuComponent } from '@/components/Home/Menu/MenuComponent';

import BakeryReportMenuIcon from '@shared/Icons/BakeryReportMenuIcon.svg';
import BakingMenuIcon from '@shared/Icons/BakingMenuIcon.svg';
import BreadBoastMenuIcon from '@shared/Icons/BreadBoastMenuIcon.svg';
import BreadChatMenuIcon from '@shared/Icons/BreadChatMenuIcon.svg';
import BreadMeetMenuIcon from '@shared/Icons/BreadMeetMenuIcon.svg';
import EventMenuIcon from '@shared/Icons/EventMenuIcon.svg';
import NewBakeryMenuIcon from '@shared/Icons/NewBakeryMenuIcon.svg';
import WeeklyPopularMenuIcongo from '@shared/Icons/WeeklyPopularMenuIcon.svg';

type Props = {};

export type HomeMenu = {
  icon: React.FC<SvgProps>;
  title: string;
  onPress: () => void;
};

export const MenuContainer = ({}: Props) => {
  const menuList: HomeMenu[] = [
    {
      icon: BreadMeetMenuIcon,
      title: '빵 모임',
      onPress: () => onPress(),
    },
    {
      icon: BakeryReportMenuIcon,
      title: '빵집 제보',
      onPress: () => onPress(),
    },
    {
      icon: WeeklyPopularMenuIcongo,
      title: '주간 인기',
      onPress: () => onPress(),
    },
    {
      icon: EventMenuIcon,
      title: '이벤트',
      onPress: () => onPress(),
    },
    {
      icon: BreadChatMenuIcon,
      title: '빵 수다',
      onPress: () => onPress(),
    },
    {
      icon: NewBakeryMenuIcon,
      title: '신상 빵집',
      onPress: () => onPress(),
    },
    {
      icon: BakingMenuIcon,
      title: '베이킹',
      onPress: () => onPress(),
    },
    {
      icon: BreadBoastMenuIcon,
      title: '빵 자랑',
      onPress: () => onPress(),
    },
  ];

  const onPress = () => {
    // console.log('onPress');
  };

  return <MenuComponent menuList={menuList} />;
};
