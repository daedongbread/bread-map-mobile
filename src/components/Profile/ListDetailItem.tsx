import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { CircleFlag, CirclePencil, CircleStar, Quote } from '@shared/Icons';
import IcFlag from '@shared/Icons/IcFlag.svg';
import IcHeart from '@shared/Icons/IcHeart.svg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
export function ListDetailItem({ item, bottomSheetRef }: any) {
  const { navigate } = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const onItemClick = () => {
    // bottomSheetRef.current?.expand();
    navigate('MainStack', {
      screen: 'BookmarkBottomSheet',
      params: {
        bakeryId: 1,
        name: 1 + '',
      },
    });
  };
  return (
    <TouchableOpacity onPress={onItemClick} style={styles.cardContainer}>
      <View style={styles.bookmarkIconWrapper}>
        <FastImage style={styles.Image} source={{ uri: item?.image }} />
        <View style={[styles.bookmarkBackground, { backgroundColor: item?.iconBackgroundColor }]}>
          {item?.icon === 'heart' ? <IcHeart width={17.5} /> : <IcFlag width={17.5} />}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.countItemsWrap}>
          <View style={styles.countItem}>
            <CircleFlag />
            <Text style={styles.countItemText}>{item?.flagCount}</Text>
          </View>
          <View style={styles.countItem}>
            <CircleStar />
            <Text style={styles.countItemText}>{item?.starCount}</Text>
          </View>
          <View style={styles.countItem}>
            <CirclePencil />
            <Text style={styles.countItemText}>{item?.reviewCount}</Text>
          </View>
        </View>
        <View style={styles.ScrollView} onStartShouldSetResponder={() => true}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item?.reviews.map((review: any, index: number) => (
              <View key={index} style={styles.reviewView}>
                <View style={styles.reviewContent}>
                  <Quote />
                  <Text style={styles.reviewText} numberOfLines={2}>
                    {review.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    cardContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    bookmarkIconWrapper: {
      width: 108,
      height: 108,
      borderRadius: 8,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    bookmarkBackground: {
      position: 'absolute',
      width: 28,
      height: 28,
      borderRadius: 99,
      justifyContent: 'center',
      alignItems: 'center',
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
      alignItems: 'center',
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
    reviewText: {
      fontSize: 12,
      marginLeft: 4,
      marginRight: 8,
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
    Image: {
      width: 108,
      height: 108,
      borderRadius: 8,
    },
    ScrollView: {
      flexDirection: 'row',
    },
  })
);
