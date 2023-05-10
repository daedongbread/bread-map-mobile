import React, { useEffect } from 'react';
import { Animated, Dimensions, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  style: StyleProp<ViewStyle>;
};

const { width } = Dimensions.get('screen');

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const gradientOption = {
  colors: ['rgba(196, 196, 196, 0)', 'rgba(196, 196, 196, 0.5)', 'rgba(196, 196, 196, 0)'],
  locations: [0.16, 0.46, 0.83],
  angle: 104,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

export const ImageSkeleton = React.memo(({ style }: Props) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const defaultGradienStyle = {
    height: '100%',
    transform: [{ translateX: translateX }],
  };

  return (
    <View style={[style, styles.container]}>
      <AnimatedLG
        colors={gradientOption.colors}
        useAngle={true}
        angle={gradientOption.angle}
        locations={gradientOption.locations}
        start={gradientOption.start}
        end={gradientOption.end}
        style={defaultGradienStyle}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
});
