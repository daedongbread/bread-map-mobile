import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { RootStackScreenProps } from '@/pages/Stack';
import { theme } from '@/styles/theme';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

type Props = RootStackScreenProps<'Onboarding'>;

export function Onboarding({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onSignIN = useCallback(() => {
    navigation.push('Auth');
  }, [navigation]);

  const carouselItems = [
    {
      step: 0,
      text: '안녕?\n나는 소빵이야!',
      source: require('@/assets/lottiles/onboarding_1.json'),
    },
    {
      step: 1,
      text: '빵순이들이 인정한 빵 맛집과\n리뷰를 한 번에 보자!',
      source: require('@/assets/lottiles/onboarding_2.json'),
    },
    {
      step: 2,
      text: '가봤던 곳부터 가보고 싶은 곳까지\n나만의 빵지도를 만들 수 있어!',
      source: require('@/assets/lottiles/onboarding_3.json'),
    },
    {
      step: 3,
      text: '빵 종류별 자세한 리뷰를 남기고\n빵순이들과 공유할 수 있어!',
      source: require('@/assets/lottiles/onboarding_4.json'),
    },
    {
      step: 4,
      text: '그럼 나는\n빵 쟁이러 이만!',
      source: require('@/assets/lottiles/onboarding_5.json'),
    },
  ];

  const renderItem = ({ item, index }: { item: { step: number; text: string; source: any }; index: number }) => {
    return <RenderItem item={item} index={index} activeIndex={activeIndex} />;
  };

  return (
    <SafeAreaView style={[styles.fullScreen, styles.root]}>
      <View style={[styles.fullScreen, styles.justifyContentCenter]}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={WINDOW_WIDTH}
            onSnapToItem={setActiveIndex}
            itemHeight={WINDOW_WIDTH}
          />
        </View>
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          dotColor={'white'}
          inactiveDotColor={'white'}
          inactiveDotOpacity={0.5}
          dotStyle={styles.dot}
          inactiveDotScale={1}
          dotContainerStyle={styles.dotContainer}
        />
      </View>
      <View style={styles.buttonContainer}>
        {activeIndex === 4 ? (
          <Button appearance={'terdary'} onPress={onSignIN}>
            시작하기
          </Button>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const RenderItem = ({
  item,
  index,
  activeIndex,
}: {
  item: { step: number; text: string; source: any };
  index: number;
  activeIndex: number;
}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (activeIndex === index) {
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [activeIndex, index]);

  return (
    <View style={[styles.fullScreen]}>
      <View style={[styles.fullScreen, styles.carouselItemContainer]}>
        <View style={styles.carouselItemTextContainer}>
          <Text presets={['bold', 'number1']} style={styles.carouselItemText}>
            {item.text}
          </Text>
        </View>
        <LottieView ref={animationRef} source={item.source} loop resizeMode={'center'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.color.primary500,
  },
  fullScreen: {
    flex: 1,
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  carouselContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH + 70,
    marginBottom: -35,
    marginTop: 35,
  },
  carouselItemContainer: {
    justifyContent: 'center',
  },
  carouselItemTextContainer: {
    position: 'relative',
    alignItems: 'center',
    bottom: WINDOW_WIDTH / 2,
  },
  carouselItemText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 33,
  },
  container: {
    paddingBottom: 20,
  },
  textWrapper: {
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
  },
  dotContainer: {
    marginHorizontal: 2,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    height: 52,
    marginBottom: 20,
  },
});
