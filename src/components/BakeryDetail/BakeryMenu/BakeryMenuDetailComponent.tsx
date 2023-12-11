import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuEntity } from '@/apis/menu/type';
import { CustomImage } from '@/components/Shared/CustomImage';
import { Header } from '@/components/Shared/Header';
import { BreadRating } from '@/components/Shared/Rating';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';

type Props = {
  bakeryName: string;
  menu: MenuEntity;
};

const { width } = Dimensions.get('screen');

export const BakeryMenuDetailComponent = ({ bakeryName, menu }: Props) => {
  const formattedPrice = Number(menu.price) ? `${Number(menu.price).toLocaleString()}원` : menu.price;

  return (
    <SafeAreaView edges={['top']}>
      <Header title={bakeryName} isPrevButtonShown />
      {!!menu.image && (
        <CustomImage
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: menu.image,
          }}
          width={width}
          height={styles.image.height}
        />
      )}
      <View style={styles.breadInfoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{menu.name}</Text>
          <View>
            <BreadRating type={'menu'} rating={menu.rating} reviewLength={menu.reviewNum} />
          </View>
        </View>

        <SplitRow height={8} />
        <Text style={styles.priceText}>{formattedPrice}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 250,
  },
  breadInfoContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: theme.color.gray900,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  priceText: {
    color: theme.color.primary500,
    fontSize: 16,
    fontWeight: '700',
  },
});
