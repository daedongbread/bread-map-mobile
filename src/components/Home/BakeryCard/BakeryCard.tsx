import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BakeryEntity } from '@/apis';
import { theme } from '@/styles/theme';
import { numberFormat, resizePixels } from '@/utils';
import { CircleFlag, CirclePencil, CircleStar, Quote } from '@shared/Icons';
import { BakeryThumbnail } from '../BakeryThumbnail';

type BakeryCardProps = {
  bakery: BakeryEntity;
};

export const BakeryCard = memo(({ bakery }: BakeryCardProps) => {
  const source = bakery.imgPath ? { uri: bakery.imgPath } : undefined;

  return (
    <View style={styles.bakeryCardContainer}>
      <BakeryThumbnail source={source} />
      <View style={styles.bakeryInfoContainer}>
        <Text style={styles.bakeryName}>{bakery.bakeryName}</Text>
        <View style={styles.countItemsWrap}>
          <View style={styles.countItem}>
            <CircleFlag />
            <Text style={styles.countItemText}>{numberFormat(bakery.flagsCount)}</Text>
          </View>
          <View style={styles.countItem}>
            <CircleStar />
            <Text style={styles.countItemText}>{bakery.avgRating.toFixed(1)}</Text>
          </View>
          <View style={styles.countItem}>
            <CirclePencil />
            <Text style={styles.countItemText}>{numberFormat(bakery.menuReviewsCount)}</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bakery.menuReviewList.map((review, idx) => (
            <View key={`${review.breadCategoryId}_${idx}`} style={styles.reviewView}>
              <View style={styles.reviewContent}>
                <Quote />
                <Text style={styles.countItemText} numberOfLines={2}>
                  {review.contents}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
});

const styles = StyleSheet.create(
  resizePixels({
    bakeryCardContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    bakeryInfoContainer: {
      marginLeft: 8,
      flex: 1,
      alignItems: 'flex-start',
      overflow: 'hidden',
    },
    bakeryName: {
      fontSize: 16,
      marginVertical: 4,
      fontWeight: 'bold',
      color: theme.color.gray900,
    },
    countItemsWrap: {
      marginBottom: 8,
      height: 20,
      flexDirection: 'row',
    },
    countItem: {
      marginRight: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    countItemText: {
      fontSize: 12,
      marginLeft: 4,
    },
    reviewView: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      width: 195,
      marginRight: 8,
      borderRadius: 8,
      backgroundColor: theme.color.gray200,
      justifyContent: 'center',
    },
    reviewContent: {
      flexDirection: 'row',
    },
  })
);
