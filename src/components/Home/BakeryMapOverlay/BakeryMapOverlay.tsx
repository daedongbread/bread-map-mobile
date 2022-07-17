import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BakeryMapSearch } from '@/components/Home/BakeryMapSearch/BakeryMapSearch';

import { FlagIcon, NavigationIcon } from '@shared/Icons';

type Props = {
  isWatched: boolean;
  showMaker: boolean;
  onPressSearch: () => void;
  onPressFlagIcon: () => void;
  onPressNavigationIcon: () => void;
};

export const BakeryMapOverlay: React.FC<Props> = ({
  isWatched,
  showMaker,
  onPressSearch,
  onPressFlagIcon,
  onPressNavigationIcon,
}) => {
  return (
    <View style={styles.container}>
      <BakeryMapSearch onPress={onPressSearch} />

      <View style={styles.iconsWrapper}>
        <TouchableOpacity onPress={onPressFlagIcon}>
          <View style={[styles.iconButton, showMaker ? styles.iconButtonActiveColor : styles.iconButtonInactiveButton]}>
            <FlagIcon color={showMaker ? 'white' : 'black'} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    top: 60,
    paddingHorizontal: 20,
    position: 'absolute',
  },
  iconsWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
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
});
