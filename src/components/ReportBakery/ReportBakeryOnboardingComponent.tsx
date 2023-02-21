import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { Button } from '../Shared/Button/Button';
import { Header } from '../Shared/Header';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';
import { OnboardCard } from './OnboardCard';

type Props = {
  data: any;
  closePage: () => void;
  onPressReport: () => void;
};

export const ReportBakeryOnboardingComponent: React.FC<Props> = ({ data, closePage, onPressReport }) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Header onPressClose={closePage} isCloseButtonShown />
      <View style={styles.fullScreen}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>
            우와,{'\n'}빵집 개척자님!{'\n'}반가워요👋
          </Text>
        </View>
        <SplitRow height={100} />
        <Carousel
          layout={'default'}
          data={data}
          renderItem={({ item }) => <OnboardCard item={item} />}
          sliderWidth={width}
          itemWidth={width * 0.5}
          firstItem={1}
          useScrollView
        />
      </View>
      <Button style={styles.bottomButton} onPress={onPressReport}>
        제보하기
      </Button>
      {insets.bottom === 0 && <SplitRow height={16} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  titleTextContainer: {
    paddingTop: 12,
    paddingLeft: 20,
  },
  titleText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '800',
  },
  bottomButton: {
    marginHorizontal: 20,
  },
});
