import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../Shared/Button/Button';
import { Header } from '../Shared/Header';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

const { height } = Dimensions.get('window');

type Props = {
  closePage: () => void;
  onPressReport: () => void;
};

export const ReportBakeryOnboardingComponent: React.FC<Props> = ({ closePage, onPressReport }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Header onPressClose={closePage} isCloseButtonShown />
      <View style={styles.fullScreen}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>
            우와,{'\n'}빵집 개척자님!{'\n'}반가워요👋
          </Text>
        </View>
        {/* <SplitRow height={300} /> */}
        {/* <Carousel
          layout={'default'}
          data={data}
          renderItem={({ item }) => <OnboardCard item={item} />}
          sliderWidth={width}
          itemWidth={width * 0.5}
          firstItem={1}
          useScrollView
        /> */}
        <LottieView
          style={{ bottom: -(height * 0.07) }}
          source={require('@/assets/lottiles/bakery_onboarding.json')}
          loop
          autoPlay
          resizeMode={'center'}
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
