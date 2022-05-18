import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BakeryEntity } from '@/apis';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { CircleFlag, CirclePencil, CircleStar, Quote } from '@shared/Icons';
import { BakeryThumbnail } from '../BakeryThumbnail';

type BakeryCardProps = {
  bakery: BakeryEntity;
};

const BakeryCard = ({ bakery }: BakeryCardProps) => (
  <View style={styles.bakeryCardContainer}>
    <BakeryThumbnail src={`${bakery.imgPath}`} />
    <View style={styles.bakeryInfoContainer}>
      <Text style={styles.bakeryName}>{bakery.bakeryName}</Text>
      <View style={styles.countItemsWrap}>
        <View style={styles.countItem}>
          <CircleFlag />
          <Text style={styles.countItemText}>{bakery.flagsCount}</Text>
        </View>
        <View style={styles.countItem}>
          <CircleStar />
          <Text style={styles.countItemText}>{bakery.avgRating.toFixed(1)}</Text>
        </View>
        <View style={styles.countItem}>
          <CirclePencil />
          <Text style={styles.countItemText}>{bakery.menuReviewsCount}</Text>
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

export { BakeryCard };

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
    },
    countItemsWrap: {
      marginBottom: 8,
      height: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    countItem: {
      marginRight: 8,
      flexDirection: 'row',
    },
    countItemText: {
      fontSize: 12,
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
