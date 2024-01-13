import React from 'react';
import { SvgProps } from 'react-native-svg';
import { PostTopic } from '@/apis/community/types';
import { MenuComponent } from '@/components/Home/Menu/MenuComponent';

import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation } from '@react-navigation/native';
import BakeryReportMenuIcon from '@shared/Icons/BakeryReportMenuIcon.svg';
import BakingMenuIcon from '@shared/Icons/BakingMenuIcon.svg';
import BreadBoastMenuIcon from '@shared/Icons/BreadBoastMenuIcon.svg';
import BreadChatMenuIcon from '@shared/Icons/BreadChatMenuIcon.svg';
import BreadMeetMenuIcon from '@shared/Icons/BreadMeetMenuIcon.svg';
import EventMenuIcon from '@shared/Icons/EventMenuIcon.svg';
import NewBakeryMenuIcon from '@shared/Icons/NewBakeryMenuIcon.svg';
import WeeklyPopularMenuIcongo from '@shared/Icons/WeeklyPopularMenuIcon.svg';

export type HomeMenu = {
  icon: React.FC<SvgProps>;
  title: string;
  onPress: () => void;
};

type Navigation = HomeStackScreenProps<'Home'>['navigation'];

export const MenuContainer = () => {
  const navigation = useNavigation<Navigation>();

  const menuList: HomeMenu[] = [
    {
      icon: BreadMeetMenuIcon,
      title: '빵 모임',
      onPress: () => goNavCommunity('EATEN_BREAD'),
    },
    {
      icon: BakeryReportMenuIcon,
      title: '빵집 제보',
      onPress: () => onPressReportBakery(),
    },
    {
      icon: WeeklyPopularMenuIcongo,
      title: '주간 인기',
      onPress: () => onPressWeeklyPopularMenu(),
    },
    {
      icon: EventMenuIcon,
      title: '이벤트',
      onPress: () => goNavCommunity('EVENT'),
    },
    {
      icon: BreadChatMenuIcon,
      title: '빵 수다',
      onPress: () => goNavCommunity('FREE_TALK'),
    },
    {
      icon: NewBakeryMenuIcon,
      title: '신상 빵집',
      onPress: () => onPressNewBakery(),
    },
    {
      icon: BakingMenuIcon,
      title: '베이킹',
      onPress: () => goNavCommunity('BREAD_STORY'),
    },
    {
      icon: BreadBoastMenuIcon,
      title: '빵 자랑',
      onPress: () => goNavCommunity('REVIEW'),
    },
  ];

  const goNavCommunity = (postTopic: PostTopic) => {
    navigation.navigate('CommunityStack', {
      screen: 'Community',
      params: {
        postTopic: postTopic,
      },
    });
  };

  const onPressReportBakery = () => {
    navigation.navigate('ReportBakeryStack', {
      screen: 'ReportBakeryOnboard',
    });
  };

  const onPressWeeklyPopularMenu = () => {
    navigation.navigate('RankingBakeryOfTheWeek');
  };

  const onPressNewBakery = () => {
    navigation.navigate('NewBakeryDetail');
  };

  return <MenuComponent menuList={menuList} />;
};
