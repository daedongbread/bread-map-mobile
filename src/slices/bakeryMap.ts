import { BakeryMapBakeryEntity } from '@/apis/bakery/types';
import { createSlice } from '@reduxjs/toolkit';

const BakeryMap = 'bakeryMap';

export type SearchMapCameraLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export interface BakeryMap {
  searchMapCameraLocation?: SearchMapCameraLocation;
  selectedMarker?: BakeryMapBakeryEntity;
  sort: 'distance' | 'popular';
}

const initialState: BakeryMap = {
  searchMapCameraLocation: undefined,
  selectedMarker: undefined,
  sort: 'distance',
};

export const bakeryMapSlice = createSlice({
  name: BakeryMap,
  initialState,
  reducers: {
    searchCurrentCameraLocation(state, action) {
      const { latitude, longitude, latitudeDelta, longitudeDelta } = action.payload;

      state.searchMapCameraLocation = {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      };
    },
    onSelectMarker(state, action) {
      const { bakeryEntity } = action.payload;

      state.selectedMarker = bakeryEntity;
    },
    onClearMarker(state) {
      state.selectedMarker = undefined;
    },
    onChangeSort(state, action) {
      const { sort } = action.payload;

      state.sort = sort;
    },
  },
});

export const { searchCurrentCameraLocation, onSelectMarker, onChangeSort, onClearMarker } = bakeryMapSlice.actions;

export default bakeryMapSlice.reducer;
