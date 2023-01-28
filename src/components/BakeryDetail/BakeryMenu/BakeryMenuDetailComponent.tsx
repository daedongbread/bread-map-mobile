import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetMenuReviews } from '@/apis/review/useGetMenuReviews';
import { Header } from '@/components/Shared/Header';
import { Reviews } from '@/components/Shared/Reviews';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useRoute } from '@react-navigation/native';
import { Divider } from '../Divider';
import { TabHeader } from '../TabHeader';

export const BakeryMenuDetailComponent = () => {
  const route = useRoute<HomeStackScreenProps<'BakeryMenuDetail'>['route']>();

  const { bakeryId, menu } = route.params;

  const { data } = useGetMenuReviews({ bakeryId, productName: menu.name });

  const onPress = () => {
    // navigation.push('BakeryMenuReviews', { screen: 'BakeryReviewDetail', params: { info, review } });
  };
  if (!data) {
    return <></>;
  }

  return (
    <SafeAreaView>
      <Header title={menu.name} isPrevButtonShown />
      <Text>상세화면임</Text>
      <Text>{menu.price}원</Text>
      <View style={styles.container}>
        <Divider />
        <Reviews
          headerComponent={
            <TabHeader onPressAddBtn={() => {}} title={'리뷰'} totalCount={data.length || 0} addBtnText={'리뷰 작성'} />
          }
          reviews={data}
          onPress={onPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
});
