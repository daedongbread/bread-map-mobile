import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import IcMapPin from '@/components/Shared/Icons/IcMapPin.svg';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { MoreLineText, Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { Footer } from '../Community/Post';
import { ProductRating } from '../Shared/Reviews';
import { ReviewListItemInImageItem } from './ReviewListItemInImageItem';

export function ReviewListItem({ item, onItemClick, onPressLike }: any) {
  const [likeToggle, setLikeToggle] = useState({
    isLiked: item.reviewInfo.isLike,
    count: item.reviewInfo.likeNum,
  });

  const _onPressLike = async (isLiked: boolean, reviewId: number) => {
    try {
      if (isLiked) {
        setLikeToggle({
          isLiked: false,
          count: likeToggle.count - 1,
        });
      } else {
        setLikeToggle({
          isLiked: true,
          count: likeToggle.count + 1,
        });
      }

      await onPressLike(isLiked, reviewId);
    } catch (e) {
      setLikeToggle(likeToggle);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => onItemClick(item)}>
      <Text presets={['body1', 'bold']} style={styles.Name}>
        {item?.bakeryInfo?.bakeryName}
      </Text>
      <View style={styles.Location}>
        <IcMapPin />
        <SplitColumn width={2} />
        <Text numberOfLines={1} style={styles.LocationText} presets={['caption2', 'medium']}>
          {item?.bakeryInfo?.bakeryAddress}
        </Text>
      </View>
      <FlatList
        style={{ marginTop: 12 }}
        contentContainerStyle={{ paddingLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        data={item?.reviewInfo?.productRatingList}
        horizontal
        renderItem={({ item: ratingItem, index }) => {
          return (
            <ProductRating
              productName={ratingItem.productName}
              rating={ratingItem.rating}
              isEnd={index === item?.reviewInfo?.productRatingList.length - 1}
            />
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />

      <SplitRow height={12} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ContentContainer}>
        {item?.reviewInfo?.imageList.map((image: any, index: number) => {
          return <ReviewListItemInImageItem url={image} key={index} />;
        })}
      </ScrollView>
      <SplitRow height={12} />
      <View style={styles.Content}>
        <MoreLineText
          color="#616161"
          presets={['body2', 'medium']}
          linesToTruncate={2}
          text={item?.reviewInfo?.content}
        />
      </View>

      <SplitRow height={12} />

      <View style={styles.footerContainer}>
        <Footer
          isLiked={likeToggle.isLiked}
          likeCount={likeToggle.count}
          commentCount={item.reviewInfo.commentCount}
          date={item.reviewInfo.createdAt}
          onPressLike={() => _onPressLike(likeToggle.isLiked, item.reviewInfo.id)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Name: {
      color: theme.color.gray900,
      marginLeft: 20,
      marginTop: 6,
    },
    Location: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 2,
    },
    LocationText: {
      color: theme.color.gray500,
      marginRight: 20,
    },
    Content: {
      marginHorizontal: 20,
    },
    ContentContainer: {
      paddingHorizontal: 20,
    },
    footerContainer: {
      paddingHorizontal: 20,
    },
  })
);
