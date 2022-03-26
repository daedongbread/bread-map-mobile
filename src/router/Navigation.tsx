import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Header, HomeSection, InfoSection, MenuSection, ReviewSection } from '@/components/BakeryDetail';
import { BakeryInfo } from '@/components/BakeryDetail/InfoSection/InfoSection'; // Type
import { MenuItem } from '@/components/BakeryDetail/MenuSection/MenuSection'; // Type
import { MenuReview } from '@/components/BakeryDetail/ReviewSection/ReviewSection'; // Type
import { Home } from '@/pages';
import { theme } from '@/styles/theme';

type NavigationProps = {
  data: {
    bakeryMenu: MenuItem[];
    reviews: MenuReview[];
    info: BakeryInfo;
  };
};

const Navigation = ({ data }: NavigationProps) => (
  <Router>
    <Stack key="root" lightbox>
      <Scene key="home" initial={true} component={Home} title="Home" />
      <Scene key="bakeryDetailHeader" navBar={() => <Header bakeryName={data.info.bakeryName} />}>
        <Scene
          key="bakeryDetailTab"
          tabs={true}
          tabBarPosition={'top'}
          tabBarStyle={styles.tabBarStyle}
          labelStyle={styles.tabFontStyle}
          indicatorStyle={styles.tabStyle}
          hideTabBar={false}
          wrap={false}
          headerMode="none"
        >
          <Scene key="bakeryDetailHome" title="홈" component={() => <HomeSection />} hideNavBar />
          <Scene
            key="bakeryDetailReview"
            title="리뷰"
            component={() => <ReviewSection reviews={data.reviews} />}
            hideNavBar
          />
          <Scene
            key="bakeryDetailMenu"
            title="메뉴"
            component={() => <MenuSection bakeryMenu={data.bakeryMenu} />}
            hideNavBar
          />
          <Scene key="bakeryDetailInfo" title="정보" component={() => <InfoSection info={data.info} />} hideNavBar />
        </Scene>
      </Scene>
    </Stack>
  </Router>
);

export { Navigation };

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: theme.color.white,
  },
  tabFontStyle: {
    color: theme.color.black,
    fontWeight: 'bold',
  },
  tabStyle: {
    backgroundColor: theme.color.primary500,
  },
  contentStyle: {
    backgroundColor: theme.color.white,
  },
});
