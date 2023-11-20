import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  width: number;
  height?: number | string;
  style: StyleProp<ViewStyle>;
};

const gradientOption = {
  colors: ['rgba(196, 196, 196, 0)', 'rgba(196, 196, 196, 0.5)', 'rgba(196, 196, 196, 0)'],
  locations: [0.16, 0.46, 0.83],
  angle: 104,
  start: { x: 1, y: 1 },
  end: { x: 1, y: 0 },
};

export const ImageSkeleton = React.memo(({ width, height = '100%', style }: Props) => {
  const animatedValue = new Animated.Value(-width);

  const translateX = useRef(animatedValue).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [translateX, width]);

  const defaultGradienStyle = {
    width: '100%',
    height: '100%',
  };

  const anmatedStyle = { ...defaultGradienStyle, transform: [{ translateX: translateX }] };

  return (
    <View
      style={StyleSheet.flatten([
        {
          width: '100%',
          height: height,
          backgroundColor: '#f5f5f5',
          overflow: 'hidden',
        },
        style,
      ])}
    >
      <Animated.View style={anmatedStyle}>
        <LinearGradient
          style={defaultGradienStyle}
          useAngle={true}
          angle={gradientOption.angle}
          colors={gradientOption.colors}
          locations={gradientOption.locations}
          start={gradientOption.start}
        />
      </Animated.View>
    </View>
  );
});
