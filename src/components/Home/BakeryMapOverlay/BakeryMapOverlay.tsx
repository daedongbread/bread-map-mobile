import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BakeryMapSearch } from '@/components/Home/BakeryMapSearch/BakeryMapSearch';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { FlagIcon, NavigationIcon } from '@shared/Icons';
import IcReset from '@shared/Icons/IcReset.svg';
import { Text } from '@shared/Text';

type Props = {
  isWatched: boolean;
  isFilterSaved: boolean;
  onPressSearch: () => void;
  onPressFlagIcon: () => void;
  onPressNavigationIcon: () => void;
  showSearchButton: boolean;
  onPressSearchButton: () => void;
};

export const BakeryMapOverlay: React.FC<Props> = React.memo(
  ({
    isWatched,
    isFilterSaved,
    onPressSearch,
    onPressFlagIcon,
    onPressNavigationIcon,
    showSearchButton,
    onPressSearchButton,
  }) => {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.searchWrapper}>
            <BakeryMapSearch onPress={onPressSearch} />
          </View>

          <View style={styles.iconsWrapper}>
            <TouchableOpacity onPress={onPressFlagIcon}>
              <View
                style={[
                  styles.iconButton,
                  isFilterSaved ? styles.iconButtonActiveColor : styles.iconButtonInactiveButton,
                ]}
              >
                <FlagIcon color={isFilterSaved ? 'white' : 'black'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressNavigationIcon}>
              <View
                style={[
                  styles.iconButton,
                  styles.iconGap,
                  isWatched ? styles.iconButtonActiveColor : styles.iconButtonInactiveButton,
                ]}
              >
                <NavigationIcon color={isWatched ? 'white' : 'black'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {showSearchButton && (
          <View style={styles.searchButtonWrapper}>
            <TouchableOpacity style={styles.searchButton} onPress={onPressSearchButton}>
              <Text presets={['caption1', 'bold']} style={styles.searchText}>
                현위치에서 검색
              </Text>
              <IcReset />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 60,
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
    bottom: '10%',
    left: SCREEN_WIDTH / 2 - 73,
    right: SCREEN_WIDTH / 2 - 73,
  },
  searchButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingRight: 16,
    paddingLeft: 20,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    marginRight: 4,
  },
});
