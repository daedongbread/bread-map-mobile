import React, { memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { FlagColor } from '@/apis/flag';
import { BakeryDTO } from '@/apis/search';
import { BakeryThumbnail } from '@/components/Map/BakeryThumbnail';
import { flagColorHexColors } from '@/containers/Bookmark';
import { theme } from '@/styles/theme';

import { numberFormat, resizePixels } from '@/utils';

import { CircleFlag, CirclePencil, CircleStar, HeartIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Props = {
  bakery: BakeryDTO;
  onPressIcon: (bakery: BakeryDTO) => void;
};

const BOOKMARK_ICON_SIZE = 28;

export const BakeryCard: React.FC<Props> = memo(({ bakery, onPressIcon }) => {
  const isDefaultImage = bakery.bakeryImageUrl?.includes('defaultImage');
  const source = bakery.bakeryImageUrl?.length > 0 ? { uri: bakery.bakeryImageUrl[0] } : undefined;

  const defaultBookmarkIconColor = 'rgba(34, 34, 34, 0.6)';

  const handleIconPress = () => {
    onPressIcon(bakery);
  };

  const IconComponent = bakery.flagColor === 'GRAY' ? CircleFlag : HeartIcon;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.bookmarkIconWrapper}>
        <BakeryThumbnail isDefaultImage={isDefaultImage} source={source} />
        <TouchableWithoutFeedback onPress={handleIconPress}>
          <IconComponent
            style={styles.bookmarkIcon}
            width={BOOKMARK_ICON_SIZE}
            height={BOOKMARK_ICON_SIZE}
            color={flagColorHexColors[bakery.flagColor as FlagColor] || defaultBookmarkIconColor}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{bakery.bakeryName}</Text>
        <View style={styles.countItemsWrap}>
          <View style={styles.countItem}>
            <CircleFlag />
            <Text style={styles.countItemText}>{numberFormat(bakery.flagCount)}</Text>
          </View>
          <View style={styles.countItem}>
            <CircleStar />
            <Text style={styles.countItemText}>{bakery.totalScore.toFixed(1)}</Text>
          </View>
          <View style={styles.countItem}>
            <CirclePencil />
            <Text style={styles.countItemText}>{numberFormat(bakery.reviewNum)}</Text>
          </View>
        </View>

        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bakery.simpleReviewList.length === 0 ? (
            <View style={[styles.reviewView, styles.emptyReviewView]}>
              <View style={styles.reviewContent}>
                <View style={styles.editIcon}>
                  <EditIcon />
                </View>
                <Text style={{ color: theme.color.gray600 }}>
                  <Text presets={['caption2', 'bold']}>이 빵집 </Text>
                  <Text presets={'caption2'} style={styles.countItemText} numberOfLines={2}>
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
                  <Text style={[styles.countItemText, styles.flex]} numberOfLines={2}>
                    {review.content}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView> */}
      </View>
    </View>
  );
});

const styles = StyleSheet.create(
  resizePixels({
    flex: {
      flex: 1,
    },
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
      marginLeft: 12,
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
      color: theme.color.gray600,
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
