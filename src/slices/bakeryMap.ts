import { createSlice } from '@reduxjs/toolkit';

const BakeryMap = 'bakeryMap';

export interface BakeryMap {
  searchMapCameraLocation?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
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

export const {} = bakeryMapSlice.actions;

export default bakeryMapSlice.reducer;
