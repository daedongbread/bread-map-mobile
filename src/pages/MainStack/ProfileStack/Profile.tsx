import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { ProfileInfo } from '@/components/Profile/ProfileInfo';
import { ReviewTab } from '@/pages/MainStack/ProfileStack/ReviewTab';
import { SaveTab } from '@/pages/MainStack/ProfileStack/SavedTab';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';

interface ProfileProps {
  navigation: MainStackScreenProps<'Profile'>;
}

const Profile = ({ navigation }: ProfileProps) => {
  // bottom tab에서 프로필 페이지에 접근한 경우, navigation 객체에 jumpTo property가 존재하므로 jumpTo로 backButton을 보여줄 것인지 트리거
  // @ts-ignore
  const isTabNavigated = navigation.jumpTo === undefined;

  const renderScene = SceneMap({
    saved: SaveTab,
    review: ReviewTab,
  });

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'saved', title: '저장목록' },
    { key: 'review', title: '리뷰' },
  ]);

  const layout = useWindowDimensions();

  return (
    <SafeAreaView>
      <View style={styles.layout}>
        <ProfileHeader showBackButton={isTabNavigated} />

        <ProfileInfo isTabNavigated={isTabNavigated} />

        <View style={styles.tabViewContainer}>
          <TabView
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={styles.tabBarIndicatorStyle}
                style={styles.tabBarStyle}
                renderLabel={({ route }) => <Text style={styles.tabBarTitle}>{route.title}</Text>}
              />
            )}
            onIndexChange={setIndex}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 20,
  },
  tabViewContainer: {
    height: '100%',
    marginTop: 24,
  },
  tabBarStyle: {
    backgroundColor: 'white',
  },
  tabBarTitle: {
    color: `${theme.color.gray900}`,
    fontSize: 14,
    fontWeight: '700',
  },
  tabBarIndicatorStyle: {
    backgroundColor: `${theme.color.primary500}`,
  },
});

export { Profile };
