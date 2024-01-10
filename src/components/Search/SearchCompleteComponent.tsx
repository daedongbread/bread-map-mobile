import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { BakeryDTO, SearchType } from '@/apis/search';
import { SearchBakeryList } from '@/components/Search/SearchBakeryList';
import { CloseIcon } from '@/components/Shared/Icons';
import { ColoredMapIcon } from '@/components/Shared/Icons/ColoredMapIcon';
import { Header } from '@/pages/MainStack/SearchStack';
import { useNavigation } from '@react-navigation/native';

type Props = {
  keyword: string;
  bakeries: Array<BakeryDTO>;
  goMap: () => void;
  goHome: () => void;
  onDistanceSortingPress: () => void;
  onPopularSortingPress: () => void;
  searchType: SearchType;
};

export const SearchCompleteComponent = ({
  keyword,
  bakeries,
  goMap,
  goHome,
  onDistanceSortingPress,
  onPopularSortingPress,
  searchType,
}: Props) => {
  const navigation = useNavigation();

  const navigateReport = useCallback(() => {
    navigation.push('ReportBakeryStack', {
      screen: 'ReportBakeryOnboard',
    });
  }, [navigation]);

  const navigateDetail = useCallback(
    (bakery: BakeryDTO) => {
      navigation.push('MainTab', {
        screen: 'HomeStack',
        params: {
          screen: 'Bakery',
          params: {
            screen: 'BakeryDetailHome',
            params: {
              bakeryId: bakery.bakeryId,
              bakeryName: bakery.bakeryName,
            },
          },
        },
      });
    },
    [navigation]
  );

  const onPressBakery = useCallback(
    (bakery: BakeryDTO) => {
      navigateDetail(bakery);
    },
    [navigateDetail]
  );

  const MapIcon = () => {
    return (
      <TouchableOpacity onPress={goMap}>
        <ColoredMapIcon />
      </TouchableOpacity>
    );
  };

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.closeIcon} onPress={goHome}>
        <CloseIcon />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header value={keyword} isCompleted LeftIcon={MapIcon} RightIcon={RightIcon} />

      <SearchBakeryList
        bakeries={bakeries}
        keyword={keyword}
        onPressReport={navigateReport}
        onPressBakery={onPressBakery}
        onDistanceSortingPress={onDistanceSortingPress}
        onPopularSortingPress={onPopularSortingPress}
        searchType={searchType}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
  },
});
