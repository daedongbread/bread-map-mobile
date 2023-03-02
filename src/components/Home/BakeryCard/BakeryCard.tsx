import React, { memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { FlagColor } from '@/apis/flag';
import { BakeryThumbnail } from '@/components/Home/BakeryThumbnail';

import { flagColorHexColors } from '@/containers/Bookmark';
import { theme } from '@/styles/theme';

import { numberFormat, resizePixels } from '@/utils';

import { CircleFlag, CirclePencil, CircleStar, HeartIcon, Quote } from '@shared/Icons';
import EditIcon from '@shared/Icons/IcEdit.svg';
import { Text } from '@shared/Text';

type Props = {
  bakery: BakeryMapBakeryEntity;
  onPressIcon: (bakery: BakeryMapBakeryEntity) => void;
};

const BOOKMARK_ICON_SIZE = 28;

export const BakeryCard: React.FC<Props> = memo(({ bakery, onPressIcon }) => {
  const source = bakery.image ? { uri: bakery.image } : undefined;

  const defaultBookmarkIconColor = 'rgba(34, 34, 34, 0.6)';

  const handleIconPress = () => {
    onPressIcon(bakery);
  };

  const IconComponent = bakery.color === 'GRAY' ? CircleFlag : HeartIcon;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.bookmarkIconWrapper}>
        <BakeryThumbnail source={source} />
        <TouchableWithoutFeedback onPress={handleIconPress}>
          <IconComponent
            style={styles.bookmarkIcon}
            width={BOOKMARK_ICON_SIZE}
            height={BOOKMARK_ICON_SIZE}
            color={flagColorHexColors[bakery.color as FlagColor] || defaultBookmarkIconColor}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{bakery.name}</Text>
        <View style={styles.countItemsWrap}>
          <View style={styles.countItem}>
            <CircleFlag />
            <Text style={styles.countItemText}>{numberFormat(bakery.flagNum)}</Text>
          </View>
          <View style={styles.countItem}>
            <CircleStar />
            <Text style={styles.countItemText}>{bakery.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.countItem}>
            <CirclePencil />
            <Text style={styles.countItemText}>{numberFormat(bakery.reviewNum)}</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bakery.simpleReviewList.length === 0 ? (
            <View style={[styles.reviewView, styles.emptyReviewView]}>
              <View style={styles.reviewContent}>
                <View style={styles.editIcon}>
                  <EditIcon />
                </View>
                <Text style={{ color: theme.color.gray600 }}>
                  <Text presets={['caption1', 'bold']}>이 빵집 </Text>
                  <Text presets={'caption1'} style={styles.countItemText} numberOfLines={2}>
                    {'맛있었나요? \n첫 리뷰를 작성해주세요'}
                  </Text>
                </Text>
              </View>
            </View>
          ) : (
            bakery.simpleReviewList.map(review => (
              <View key={`${review.id}`} style={styles.reviewView}>
                <View style={styles.reviewContent}>
                  <Quote />
                  <Text style={styles.countItemText} numberOfLines={2}>
                    {review.content}
                  </Text>
                </View>
              </View>
            ))
          )}
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
    emptyReviewView: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.color.gray200,
    },
    editIcon: {
      marginTop: 2,
      marginRight: 6,
    },
    reviewContent: {
      flexDirection: 'row',
    },
  })
);
