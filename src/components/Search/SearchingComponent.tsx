import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from '@/components/BakeryDetail/Divider';
import { HistoryItem } from '@/components/Search/HistoryItem';
import { theme } from '@/styles/theme';

type Props = {
  searchValue: string;
  suggestions: Array<string>;
  onPress: (name: string) => void;
};

export const SearchingComponent = ({ searchValue, suggestions, onPress }: Props) => {
  return (
    <View>
      <>
        {suggestions?.map((name, index) => {
          return (
            <View key={index}>
              <HistoryItem name={name} onPress={() => onPress(name)} searchValue={searchValue} />
              <Divider style={styles.divider} />
            </View>
          );
        })}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: theme.color.gray300,
  },
});
