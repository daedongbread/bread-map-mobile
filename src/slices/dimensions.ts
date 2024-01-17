import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DimensionsType = {
  width: number;
  height: number;
};

const initialState: DimensionsType = {
  width: 0,
  height: 0,
};

const dimensionsSlice = createSlice({
  name: 'dimensions',
  initialState,
  reducers: {
    setDimensions(state, { payload }: PayloadAction<DimensionsType>) {
      return payload;
    },
  },
});

export default dimensionsSlice.reducer;
export const { setDimensions } = dimensionsSlice.actions;
