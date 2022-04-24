import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

interface Slide {
  pageNum: number;
  title: string;
  image: any;
}

const slides: Slide[] = [
  {
    pageNum: 0,
    title: '안녕?\n난 소빵이야!',
    image: require('../components/Shared/Images/onboarding_1.png'),
  },
  {
    pageNum: 1,
    title: '혹시 주종목인 빵이 있어?\n좋아하는 빵만 모아소 보여줄게!',
    image: require('../components/Shared/Images/onboarding_2.png'),
  },
  {
    pageNum: 2,
    title: '가고 싶은 곳과 가본 곳에\n빵깃발을 꽃을 수 있어!',
    image: require('../components/Shared/Images/onboarding_3.png'),
  },
  {
    pageNum: 3,
    title: '빵 리뷰를 써서 빵순이들이\n윤택한 빵라이프를 살도록 돕자!',
    image: require('../components/Shared/Images/onboarding_4.png'),
  },
  {
    pageNum: 4,
    title: '그럼 나는\n빵 쟁이러 이만!',
    image: require('../components/Shared/Images/onboarding_5.png'),
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {}, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <FlatList
          contentContainerStyle={{ height: height * 0.8, alignItems: 'center' }}
          horizontal
          onMomentumScrollEnd={e => setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          data={slides}
          renderItem={({ item }) => <SlideItem title={item.title} image={item.image} />}
        />
        <Paginator currentIndex={currentIndex} />
        {currentIndex === slides.length - 1 ? <StartButton /> : null}
      </View>
    </SafeAreaView>
  );
};

export { Onboarding };

interface SlideItemProps {
  title: string;
  image: any;
}

const SlideItem = ({ title, image }: SlideItemProps) => {
  return (
    <View style={styles.slideItem}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ height: height * 0.1 }} />
      <Image style={styles.onboarding} source={image} />
    </View>
  );
};

interface PaginatorProps {
  currentIndex: number;
}

const Paginator = ({ currentIndex }: PaginatorProps) => {
  return (
    <View style={styles.paginator}>
      {slides.map(slide => {
        return <Dot currentIndex={currentIndex} pageNum={slide.pageNum} key={slide.pageNum} />;
      })}
    </View>
  );
};

interface DotProps {
  currentIndex: number;
  pageNum: number;
}

const Dot = ({ currentIndex, pageNum }: DotProps) => {
  const dotStyle = currentIndex === pageNum ? styles.dot_active : styles.dot;
  return <View style={dotStyle} />;
};

const StartButton = () => {
  const onPress = () => {
    return null;
  };

  return (
    <View style={styles.startButtonContainer}>
      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#FF6E40',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizmargontal: 20,
  },
  slideItem: {
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'NanumSquareRoundOTF',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  onboarding: {
    width: 360,
    height: 260,
  },
  paginator: {
    height: height * 0.15,
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    marginHorizontal: 2,
    borderRadius: 50,
  },
  dot_active: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
    marginHorizontal: 2,
    borderRadius: 50,
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
  startButton: {
    fontSize: 16,
    color: '#616161',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    color: '#616161',
    fontWeight: '700',
    fontSize: 16,
  },
});
