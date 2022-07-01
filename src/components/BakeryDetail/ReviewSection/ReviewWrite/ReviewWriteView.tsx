import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BakeryType } from '@/containers/Review/ReviewWriteContainer';
import { AddButton } from './AddButton';
import { Bakery } from './Bakery';
import { BakeryToggle } from './BakeryToggle';
import { Header } from './Header';
import { MainHeader } from './MainHeader';
import { NoDataRow } from './NoDataRow';
import { ReviewSearch } from './ReviewSearch';

interface Props {
  bakerys: BakeryType[];
  searchValue: string;
  selectedBakery: BakeryType[];
  onChnageSearchValue: (searchValue: string) => void;
  onChangeSeledtedBakery: (bakery: BakeryType, value: boolean) => void;
}

export const ReviewWriteView: React.FC<Props> = ({
  bakerys,
  searchValue,
  selectedBakery,
  onChnageSearchValue,
  onChangeSeledtedBakery,
}) => {
  return (
    <SafeAreaView>
      <MainHeader />
      <FlatList
        data={selectedBakery}
        contentContainerStyle={styles.selectedBakeryContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <BakeryToggle bakeryName={item.bakeryName} />}
      />
      <ReviewSearch searchValue={searchValue} onChnageSearchValue={onChnageSearchValue} />
      <View style={styles.contentsContainer}>
        <Header bakeryCount={bakerys.length} />
        {bakerys.length ? (
          <FlatList
            data={bakerys}
            renderItem={({ item, index }) => (
              <>
                <Bakery
                  bakeryName={item.bakeryName}
                  bakeryPrice={'' + item.bakeryPrice}
                  bakeryImageUrl={item.imagePath}
                  onChangeSeledtedBakery={onChangeSeledtedBakery}
                />
                {index === bakerys.length - 1 && <AddButton />}
              </>
            )}
          />
        ) : (
          <>
            <NoDataRow />
            <AddButton />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedBakeryContainer: {
    paddingHorizontal: 20,
  },
  contentsContainer: {
    paddingTop: 13,
    paddingHorizontal: 20,
  },
});
