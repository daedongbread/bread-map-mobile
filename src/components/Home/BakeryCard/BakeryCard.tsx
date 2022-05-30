import React, { memo } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BakeryEntity } from '@/apis';

import { BakeryThumbnail } from '@/components/Home/BakeryThumbnail';

import { theme } from '@/styles/theme';

import { numberFormat, resizePixels } from '@/utils';

import { CircleFlag, CirclePencil, CircleStar, Quote } from '@shared/Icons';

type Props = {
  bakery: BakeryEntity;
  onPressIcon: (bakery: BakeryEntity) => void;
};

const BOOKMARK_ICON_SIZE = 28;

export const BakeryCard: React.FC<Props> = memo(({ bakery, onPressIcon }) => {
  const source = bakery.imgPath ? { uri: bakery.imgPath } : undefined;

  const defaultBookmarkIconColor = 'rgba(34, 34, 34, 0.6)';

  const handleIconPress = () => {
    onPressIcon(bakery);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.bookmarkIconWrapper}>
        <BakeryThumbnail source={source} />
        <TouchableWithoutFeedback onPress={handleIconPress}>
          <CircleFlag
            style={styles.bookmarkIcon}
            width={BOOKMARK_ICON_SIZE}
            height={BOOKMARK_ICON_SIZE}
            color={defaultBookmarkIconColor}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{bakery.bakeryName}</Text>
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
    cardContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    bookmarkIconWrapper: {
      position: 'relative',
    },
    bookmarkIcon: {
      position: 'absolute',
      right: 6,
      bottom: 6,
    },
    infoContainer: {
      marginLeft: 8,
      flex: 1,
      alignItems: 'flex-start',
      overflow: 'hidden',
    },
    name: {
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
