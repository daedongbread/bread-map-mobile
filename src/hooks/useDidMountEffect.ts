import { useEffect, useRef } from 'react';

/**
 * useEffect 사용시 첫 렌더링을 무시하는 hook 입니다
 * @howToUse useEffect 사용법과 동읿 합니다 (useEffect(func, deps))
 * @param func
 * @param deps
 */
export const useDidMountEffect = (func: any, deps: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
