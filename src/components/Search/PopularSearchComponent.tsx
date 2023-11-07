import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PopularSearchTag } from '@/components/Search';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

export type PopularSearchTagType = {
  name: string;
};

type Props = {
  popularSearchList: Array<PopularSearchTagType>;
};

export const PopularSearchComponent = ({ popularSearchList }: Props) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text presets={['body1', 'bold']} color={theme.color.gray900}>
          인기 검색
        </Text>
      </View>

      <View style={styles.tagContainer}>
        {popularSearchList?.map(tag => {
          const { name } = tag;
          return (
            <View style={styles.tag}>
              <PopularSearchTag name={name} onPress={() => {}} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
});
