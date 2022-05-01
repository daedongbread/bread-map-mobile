import React, { ComponentProps, useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

import { BakeryMarker } from '@/components/Home';
import { theme } from '@/styles/theme';
import { resizePixel } from '@/utils';
import { FlagIcon, NavigationIcon, SearchIcon } from '@shared/Icons';

const MIN_ZOOM_LEVEL = 17;
const MAX_ZOOM_LEVEL = 25;

type Props = MapViewProps &
  Pick<ComponentProps<typeof BakeryMarker>, 'coordinate'> & {
    onPressIcon: () => void;
  };

export const BakeryMap: React.FC<Props> = ({ provider, initialRegion, coordinate, onPressIcon }) => {
  const handlePressIcon = useCallback(() => {
    onPressIcon();
  }, [onPressIcon]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={provider}
        initialRegion={initialRegion}
        minZoomLevel={MIN_ZOOM_LEVEL}
        maxZoomLevel={MAX_ZOOM_LEVEL}
        style={styles.map}
      >
        <BakeryMarker coordinate={coordinate} onPress={handlePressIcon} />
      </MapView>
      <View style={{ width: '100%', top: 60, paddingHorizontal: 20, position: 'absolute' }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 14,
            paddingHorizontal: 18,
            flexDirection: 'row',
            borderRadius: 8,
            shadowOffset: {
              width: 4,
              height: 6,
            },
            shadowColor: 'black',
            shadowOpacity: 0.1,
          }}
        >
          <View style={{ marginRight: 10 }}>
            <SearchIcon />
          </View>
          <TextInput
            placeholder={'빵집을 검색해보세요'}
            placeholderTextColor={theme.color.gray500}
            style={{ fontSize: resizePixel(14), fontWeight: 'bold' }}
          />
        </View>
        <View style={{ flex: 1, marginTop: 20, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <View
            style={{
              borderRadius: 44,
              backgroundColor: 'white',
              width: 44,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FlagIcon />
          </View>

          <View
            style={{
              borderRadius: 44,
              backgroundColor: 'white',
              width: 44,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <NavigationIcon />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
