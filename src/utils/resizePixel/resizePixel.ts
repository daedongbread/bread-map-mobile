import { ImageStyle, TextStyle, ViewStyle, Dimensions } from 'react-native';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const SCREEN_WIDTH = Dimensions.get('screen').width;
const DESIGN_WIDTH = 360;

//디자인과 화면 너비에 맞게 size를 조절합니다.
export const resizePixel = (x: number) => {
  return (x / DESIGN_WIDTH) * SCREEN_WIDTH;
};

const NO_RESIZE_STYLE = ['flex', 'fontWeight'];

export const resizePixels = <T extends NamedStyles<T> | NamedStyles<any>>(styleObject: T | NamedStyles<T>): T => {
  let data = {} as any;
  for (const [key, value] of Object.entries(styleObject)) {
    for (const [styleKey, styleValue] of Object.entries(value)) {
      if (!data[key]) {
        data[key] = {};
      }

      data[key][styleKey] =
        NO_RESIZE_STYLE.includes(styleKey) || isNaN(+styleValue) ? styleValue : resizePixel(+styleValue);
    }
  }

  return data as T;
};
