# Branch 전략

- main : Release(배포) 출시 할 수 있는 브랜치
- develop : 다음 출시 버전을 개발하는 브랜치
- feature : 기능을 개발하는 브랜치 (Local)
- readme : README 싱크, 업데이트를 하는 브랜치
- release : 이번 출시 버전을 준비하는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

# 커밋 컨벤션

feat : 새로운 기능의 추가  
fix : 버그 수정  
docs : 문서 수정  
style : 코드 스타일 관련 기능(코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)  
refactor : 코드 리펙토링   
chore : 빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)
test : 테스트 코트, 리펙토링 테스트 코드 추가



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

### 사용하는 브렌치가 develop 의 최신을 유지할 수 있도록 해주세요

1. main, develop 에 직접 커밋은 사용하시면 안됩니다.
2. 별도의 브렌치를 추가하여 develop PR을 날립니다.
  - 기존에는 필수 리뷰어를 설정했으나 이게 잘 지켜지지 않아서 임시 제거 하였습니다.
4. Merge 가 끝난 브렌치는 삭제하거나 develop 에 리베이스 하여 계속해서 사용할 수 있습니다.

## 코드 작성 참고사항

컴포넌트 코드를 작성할 때는 container 와 view component 를 분리합니다.   


```tsx
// container
import { useState } from 'react';

type Props = {
  start: number;
};

export const ExampleContainer:React.FC<Props> = ({ start }) => {
  const [count, setCount] = useState(start);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => prev + 1);

  return (
    <Example count={count} increase={increase} decrease={decrease} />
  )
};
```

```tsx
// view-component 
import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { bindHook } from '../../utils';
import { useExample } from './useExample';

export const Example = React.memo(({ count, increase, decrease }) => (
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

단순 컴포넌트를 export 시에는 최대한 export default 사용을 자제합니다
export default 는 타입스크립트 기능에서 추론하기 어려워 하는 부분이 있기 떄문입니다.


```typescript
//index
export { Example } from './Example';
```

# Style


~~스타일에 대한 룰은 아직 명확하게 정해지지 않았습니다  
코드를 보면 emotion과 styleSheet를 동시에 사용하고 있는데  
다음과 같은 이유에서 사용하고 있습니다.~~

styleSheet 만 사용합니다.

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
 
- ~~하지만 색상을 적용하는데에 있어서는 theme을 사용하기 때문에.   
themeProvider를 제공해주는 emotion이 좀더 유용합니다.~~

색상의 경우 theme 을 main/styles 에서 import 하여 styleSheet 로 사용합니다.

```typescript
//example

import { theme } from "@/styles/theme";

const styles = StyleSheet.create(
  resizePixels({
    text: {
      color: theme.color.primary500
    },
  })
);
```
