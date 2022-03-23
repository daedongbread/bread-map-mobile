# 커밋 컨벤션

fix: 수정사항.  
refector: 리팩토링.  
chorn: 문서수정.  
feat: 기능 추가.  



# 환경구축하기
[Mac에 리액트 네이티브 환경 구축하기](https://dev-yakuza.posstree.com/ko/react-native/install-on-mac/)   
[프론트 노션](https://www.notion.so/35551eaa7c91438eb68b21ec86a59121)

# Package Script

```
-- 개발 환경   
"android:prod": "react-native run-android --variant=productiondebug",   
-- 개발 환경 릴리즈   
"android:prod-release": "react-native run-android --variant=productionrelease",   
-- 프로덕션 환경
"android:dev": "react-native run-android --variant=developmentdebug",      
-- 프로덕션 환경 릴리즈   
"android:dev-release": "react-native run-android --variant=developmentrelease",   
-- 개발환경   
"ios:dev": "react-native run-ios --scheme daedongbreadDev",   
-- 프로덕션 환경   
"ios:prod": "react-native run-ios --scheme daedongbreadProd",  

-- 위 환경을 켜는 스크립트를 실행하면 자동으로 켜집니다.   
"start": "react-native start",  
--debugger open   
"debugger": "open 'rndebugger://set-debugger-loc?host=localhost&port=8081'" 
```




# 커밋

### 사용하는 브렌치가 main의 최신을 유지할 수 있도록 해주세요

1. main에 직접 커밋은 사용하시면 안됩니다.
2. 별도의 브렌치를 추가하여 main PR을 날립니다.
  - 기존에는 필수 리뷰어를 설정했으나 이게 잘 지켜지지 않아서 임시 제거 하였습니다.
3. Merge할 때는 일반 Merge가 아닌 Squash Merge를 사용합니다.
4. Merge가 끝난 브렌치는 삭제하거나 main에 리베이스 하여 계속해서 사용할 수 있습니다.

## 코드 작성 참고사항

컴포넌트 코드를 작성할 때는 hook과 viewComponent를 분리합니다.   
아래와 같이 bindHook이라는 유틸을 사용해서 viewComponent에 hook을 주입해서 사용해 줍니다.

아래와 같이 사용하게 된다면 의존성이 떨어지게 되고   
데이터만 주입해주면 바로 보여질수 있는 컴포넌트를 만들 수 있습니다.

```typescript
//hook
import { useState } from 'react';

type UseExampleProps = {
  start: number;
};

export const useExample = ({ start }: UseExampleProps) => {
  const [count, setCount] = useState(start);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => prev + 1);

  return {
    count,
    increase,
    decrease,
  };
};
```

```typescript
//viewComponent
import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { bindHook } from '../../utils';
import { useExample } from './useExample';

export const Example = bindHook(useExample, ({ count, increase, decrease }) => (
  <View style={styles.container}>
    <Text>{count}</Text>
    <Button title={'up'} onPress={increase} />
    <Button title={'down'} onPress={decrease} />
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```

단순 컴포넌트를 export시에는 최대한 default export 사용을 자제합니다
default export는 타입스크립트 기능에서 추론하기 어려워 하는 부분이 있기 떄문입니다.


```typescript
//index
export { Example } from './Example';
```

# Style

스타일에 대한 룰은 아직 명확하게 정해지지 않았습니다
코드를 보면 emotion과 styleSheet를 동시에 사용하고 있는데   
다음과 같은 이유에서 사용하고 있습니다.

 - 각 기기별 PixelRatio가 다르기 때문에 이를 맞춰주기 위한 resizePixel이라는 유틸을 사용합니다.
 - 이를 한꺼번에 적용하는데에는 styleSheet가 좀더 유용합니다.
```typescript
//example

const styles = StyleSheet.create(
  resizePixels({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
      width: 25,
      height: 25,
      marginRight: 8,
      marginBottom: 4,
    },

    button: {
      marginBottom: 12,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 320,
      height: 56,
    },

    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
);
```
 - 하지만 색상을 적용하는데에 있어서는 theme을 사용하기 때문에.   
themeProvider를 제공해주는 emotion이 좀더 유용합니다.
```typescript

const Button = styled(TouchableWithoutFeedback)`
  background: ${({ theme }) => theme.color.white};
`;
```
