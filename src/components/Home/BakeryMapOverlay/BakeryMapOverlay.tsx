import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BakeryMapSearch } from '@/components/Home/BakeryMapSearch/BakeryMapSearch';

import { FlagIcon, NavigationIcon } from '@shared/Icons';

type Props = {
  onPressSearch: () => void;
  searchValue: string;
  onChangeSearch: (text: string) => void;
  onPressFlagIcon: () => void;
  onPressNavigationIcon: () => void;
};

export const BakeryMapOverlay: React.FC<Props> = ({
  onPressSearch,
  onChangeSearch,
  onPressFlagIcon,
  onPressNavigationIcon,
}) => {
  return (
    <View style={styles.container}>
      <BakeryMapSearch onPress={onPressSearch} />

      <View style={styles.iconsWrapper}>
        <View style={styles.iconButton}>
          <FlagIcon onPress={onPressFlagIcon} />
        </View>

        <View style={[styles.iconButton, styles.iconGap]}>
          <NavigationIcon onPress={onPressNavigationIcon} />
        </View>
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
  iconGap: {
    marginTop: 12,
  },
});
