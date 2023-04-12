import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { RatedBread } from '@/slices/reviewWrite';
import { BreadToggle } from './BreadToggle';

type Props = {
  selectedBreads: RatedBread[];
  manualSelectedBreads: RatedBread[];
};

export const BreadToggleList: React.FC<Props> = ({ selectedBreads, manualSelectedBreads }) => {
  const ref = useRef<FlatList>(null);
  const [prevBreadsSize, setPrevBreadsSize] = useState(0);
  const renderData = [...selectedBreads, ...manualSelectedBreads];

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      ref.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  useDidMountEffect(() => {
    if (prevBreadsSize < renderData.length) {
      scrollToEnd();
    }

    setPrevBreadsSize(renderData.length);
  }, [selectedBreads, manualSelectedBreads]);

  return (
    <FlatList
      ref={ref}
      data={renderData}
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <BreadToggle bread={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
