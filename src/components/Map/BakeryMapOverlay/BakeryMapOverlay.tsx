import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import { FlagIcon } from '@shared/Icons';
import IcReset from '@shared/Icons/IcReset.svg';
import { Text } from '@shared/Text';
import { BakeryMapSearch } from '../BakeryMapSearch/BakeryMapSearch';

type Props = {
  topInsets: number;
  isFilterSaved: boolean;
  onPressSearch: () => void;
  onPressFlagIcon: () => void;
  onPressNavigationIcon: () => void;
  showSearchButton: boolean;
  onPressSearchButton: () => void;
};

export const BakeryMapOverlay: React.FC<Props> = React.memo(
  ({
    topInsets,
    isFilterSaved,
    onPressSearch,
    onPressFlagIcon,
    onPressNavigationIcon,
    showSearchButton,
    onPressSearchButton,
  }) => {
    return (
      <>
        <View style={[styles.container, { top: topInsets + 20 }]}>
          <View style={styles.searchWrapper}>
            <BakeryMapSearch onPress={onPressSearch} />
          </View>
        </View>

        <View style={styles.searchButtonWrapper}>
          <TouchableOpacity onPress={onPressNavigationIcon} style={styles.flex} />
          <TouchableOpacity
            style={[styles.searchButton, !showSearchButton && styles.displayNone]}
            onPress={onPressSearchButton}
          >
            <Text presets={['caption1', 'bold']} style={styles.searchText}>
              현위치에서 재검색
            </Text>
            <IcReset />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressFlagIcon} style={styles.filterButton}>
            <View
              style={[
                styles.iconButton,
                isFilterSaved ? styles.iconButtonActiveColor : styles.iconButtonInactiveButton,
              ]}
            >
              <FlagIcon color={isFilterSaved ? 'white' : 'black'} />
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  displayNone: {
    display: 'none',
  },
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
  searchWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 44,
  },
  iconsWrapper: {
    position: 'absolute',
    right: 0,
    top: 44 + 32,
  },
  iconButton: {
    borderRadius: 44,
    backgroundColor: 'white',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 10,
  },
  iconButtonActiveColor: {
    backgroundColor: 'black',
  },
  iconButtonInactiveButton: {
    backgroundColor: 'white',
  },
  iconGap: {
    marginTop: 12,
  },
  searchButtonWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '10%',
    width: Dimensions.get('screen').width - 10,
    justifyContent: 'space-between',
  },
  searchButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingRight: 16,
    paddingLeft: 20,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 6,
  },
  searchText: {
    marginRight: 4,
    color: '#222222',
  },
  filterButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
