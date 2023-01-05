import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { CircleFlag, CirclePencil, CircleStar, Quote } from '@shared/Icons';
import IcFlag from '@shared/Icons/IcFlag.svg';
import IcHeart from '@shared/Icons/IcHeart.svg';
import defaultProfile from '@shared/Images/defaultProfile.png';
import { FlagColors } from './ProfileComponent';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
export function ListDetailItem({ item, bottomSheetRef, name, color }: any) {
  const { navigate } = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();

  const FlagColor =
    color === 'ORANGE'
      ? FlagColors.ORANGE
      : color === 'GREEN'
      ? FlagColors.GREEN
      : color === 'YELLOW'
      ? FlagColors.YELLOW
      : color === 'CYAN'
      ? FlagColors.CYAN
      : color === 'BLUE'
      ? FlagColors.BLUE
      : color === 'SKY'
      ? FlagColors.SKY
      : color === 'NAVY'
      ? FlagColors.NAVY
      : color === 'PURPLE'
      ? FlagColors.PURPLE
      : color === 'RED'
      ? FlagColors.RED
      : FlagColors.PINK;

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
        <View>
          <View style={styles.Placeholder}>
            <ImageBackground source={defaultProfile} resizeMode="contain" style={styles.PlaceholderImage} />
          </View>
          <FastImage style={styles.Image} source={{ uri: item?.image }} />
        </View>
        <View style={[styles.bookmarkBackground, { backgroundColor: FlagColor }]}>
          {name !== '가봤어요' ? <IcHeart width={17.5} /> : <IcFlag width={17.5} />}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.countItemsWrap}>
          <View style={styles.countItem}>
            <CircleFlag />
            <Text style={styles.countItemText}>{item?.flagNum}</Text>
          </View>
          <View style={styles.countItem}>
            <CircleStar />
            <Text style={styles.countItemText}>{item?.rating}</Text>
          </View>
          <View style={styles.countItem}>
            <CirclePencil />
            <Text style={styles.countItemText}>{item?.reviewNum}</Text>
          </View>
        </View>
        <View style={styles.ScrollView}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item?.simpleReviewList}
            renderItem={({ item }) => {
              return (
                <View key={item?.id} style={styles.reviewView} onStartShouldSetResponder={() => true}>
                  <View style={styles.reviewContent}>
                    <Quote />
                    <Text style={styles.reviewText} numberOfLines={2}>
                      {item.content}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
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
      borderRadius: 20,
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
      color: '#757575',
    },
    reviewView: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      width: 195,
      height: 54,
      marginRight: 8,
      borderRadius: 8,
      backgroundColor: theme.color.gray200,
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
    Placeholder: {
      position: 'absolute',
      backgroundColor: '#eeeeee',
      borderRadius: 20,
      width: 108,
      height: 108,
      justifyContent: 'center',
      alignItems: 'center',
    },
    PlaceholderImage: {
      width: 56,
      height: 56,
    },
  })
);
