import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@shared/Button/Button';
import { Header } from '@shared/Header';
import { SplitRow } from '@shared/SplitSpace';
import { Text } from '@shared/Text';

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
          <Text presets={['heading1', 'bold']} color={'#000000'}>
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
        <View style={styles.container}>
          <LottieView
            source={require('@/assets/lottiles/bakery_onboarding.json')}
            loop
            autoPlay
            resizeMode={'center'}
          />
        </View>
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
  bottomButton: {
    marginHorizontal: 20,
  },
});
