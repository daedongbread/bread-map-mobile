import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReviewState = {
  selectedBakerys: BakeryType[];
};

export type updateSeletedBakeryRating = {
  id: number;
  rating: number;
};

const initialState: ReviewState = {
  selectedBakerys: [],
};

const slice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    updateSeletedBakerys(state, { payload }: PayloadAction<BakeryType[]>) {
      state.selectedBakerys = payload;
    },
    updateSeletedBakeryRating(state, { payload }: PayloadAction<updateSeletedBakeryRating>) {
      state.selectedBakerys = state.selectedBakerys.map(bakery => {
        return bakery.id === payload.id ? { ...bakery, rating: payload.rating } : bakery;
      });
    },
  },
});

export default slice.reducer;
export const { updateSeletedBakerys, updateSeletedBakeryRating } = slice.actions;
