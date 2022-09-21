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
}

const initialState: BakeryMap = {
  searchMapCameraLocation: undefined,
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
  },
});

export const { searchCurrentCameraLocation } = bakeryMapSlice.actions;

export default bakeryMapSlice.reducer;
