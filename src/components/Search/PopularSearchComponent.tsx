import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PopularKeywordsEntity } from '@/apis/search';
import { PopularSearchTag } from '@/components/Search';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  keywords: PopularKeywordsEntity;
  onPress: (name: string) => void;
};

export const PopularSearchComponent = ({ keywords, onPress }: Props) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text presets={['body1', 'bold']} color={theme.color.gray900}>
          인기 검색
        </Text>
      </View>

      <View style={styles.tagContainer}>
        {keywords?.map((item, index) => {
          const { keyword, rank } = item;
          return (
            <View style={styles.tag} key={`popularKeyword:${index}`}>
              <PopularSearchTag name={keyword} onPress={onPress} />
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
