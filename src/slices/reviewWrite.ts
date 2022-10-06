import { Asset } from 'react-native-image-picker';
import { BreadEntity } from '@/apis/bread';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RatedBread = BreadEntity & {
  rating?: number;
};

type BreadState = {
  selectedBreads: RatedBread[];
  manualSelectedBreads: RatedBread[];
  detailReview: string;
  images: Asset[];
};

export type UpdateSelectedBread = {
  bread: BreadEntity;
  isChecked: boolean;
};

export type AddManualSelectedBread = {
  manualInputBread: RatedBread;
  isChecked: boolean;
};

export type UpdateSeletedBreadRating = {
  id: number;
  rating: number;
};

const initialState: BreadState = {
  selectedBreads: [],
  manualSelectedBreads: [],
  detailReview: '',
  images: [],
};

const slice = createSlice({
  name: 'reviewWrite',
  initialState,
  reducers: {
    updateAllSeletedBread(state, { payload }: PayloadAction<BreadEntity[]>) {
      const ratedBreads: RatedBread[] = payload.map(bread => {
        return {
          rating: 0,
          ...bread,
        };
      });
      state.selectedBreads = ratedBreads;
    },
    updateSelectedBread(state, { payload }: PayloadAction<UpdateSelectedBread>) {
      let newSelectedBreads: RatedBread[] = [];
      if (payload.isChecked) {
        newSelectedBreads = [...state.selectedBreads, payload.bread];
      } else {
        newSelectedBreads = state.selectedBreads.filter(_bread => _bread.id !== payload.bread.id);
      }

      state.selectedBreads = newSelectedBreads;
    },
    updateManualSelectedBread(state, { payload }: PayloadAction<BreadEntity>) {
      const manualSelectedBreads = state.manualSelectedBreads.map(selectedBreads => {
        if (selectedBreads.id === payload.id) {
          return payload;
        } else {
          return selectedBreads;
        }
      });

      state.manualSelectedBreads = manualSelectedBreads;
    },
    addManualSelectedBread(state, { payload }: PayloadAction<AddManualSelectedBread>) {
      let newManualSelectedBreads: RatedBread[] = [];
      if (payload.isChecked) {
        newManualSelectedBreads = [...state.manualSelectedBreads, payload.manualInputBread];
      } else {
        newManualSelectedBreads = state.manualSelectedBreads.filter(
          _manualInputBread => _manualInputBread.id !== payload.manualInputBread.id
        );
      }

      state.manualSelectedBreads = newManualSelectedBreads;
    },
    updateSeletedBreadRating(state, { payload }: PayloadAction<UpdateSeletedBreadRating>) {
      state.selectedBreads = state.selectedBreads.map(bread => {
        return bread.id === payload.id ? { ...bread, rating: payload.rating } : bread;
      });
    },
    updateDetailReview(state, { payload }: PayloadAction<{ detailReview: string }>) {
      state.detailReview = payload.detailReview;
    },
    updateImages(state, { payload }: PayloadAction<Asset[]>) {
      state.images = payload;
    },
    resetSelectedBreads() {
      return { ...initialState };
    },
  },
});

export default slice.reducer;
export const {
  updateAllSeletedBread,
  updateSelectedBread,
  updateManualSelectedBread,
  addManualSelectedBread,
  updateSeletedBreadRating,
  updateDetailReview,
  updateImages,
  resetSelectedBreads,
} = slice.actions;
