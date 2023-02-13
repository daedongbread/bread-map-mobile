import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuEntity } from '@/apis/menu/type';
import { Header } from '@/components/Shared/Header';
import { BreadRating } from '@/components/Shared/Rating';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { theme } from '@/styles/theme';

type Props = {
  menu: MenuEntity;
};

const tempImage = 'https://cdn.paris.spl.li/wp-content/uploads/까방베르-치즈-후레쉬번_썸네일1-1280x1280.png';

export const BakeryMenuDetailComponent = ({ menu }: Props) => {
  return (
    <SafeAreaView edges={['top']}>
      <Header title={menu.name} isPrevButtonShown />
      <Image
        style={styles.image}
        source={{
          uri: tempImage,
        }}
      />
      <View style={styles.breadInfoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{menu.name}</Text>
          <View>
            <BreadRating type={'menu'} rating={menu.rating} reviewLength={menu.reviewNum} />
          </View>
        </View>

        <SplitRow height={8} />
        <Text style={styles.priceText}>{Number(menu.price).toLocaleString()}원</Text>
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
