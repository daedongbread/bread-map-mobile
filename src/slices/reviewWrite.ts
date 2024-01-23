import { Asset } from 'react-native-image-picker';
import { MenuForReviewEntity } from '@/apis/menu/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BreadType = 'auto' | 'manual';

export type RatedBread = MenuForReviewEntity & {
  type?: BreadType;
  rating?: number;
};

type BreadState = {
  selectedTags: string[];
  selectedBreads: RatedBread[];
  manualSelectedBreads: RatedBread[];
  detailReview: string;
  images: Asset[];
};

export type UpdateSelectedBread = {
  bread: MenuForReviewEntity;
  isChecked: boolean;
};

export type AddManualSelectedBread = {
  manualInputBread: RatedBread;
  isChecked: boolean;
};

export type DeleteManualSelectedBread = {
  id: number;
};

export type UpdateSeletedBreadRating = {
  id: number;
  rating: number;
  type?: BreadType;
};

const initialState: BreadState = {
  selectedTags: [],
  selectedBreads: [],
  manualSelectedBreads: [],
  detailReview: '',
  images: [],
};

const slice = createSlice({
  name: 'reviewWrite',
  initialState,
  reducers: {
    updateSelectedTags(state, { payload }: PayloadAction<string[]>) {
      state.selectedTags = payload;
    },
    updateAllSeletedBread(state, { payload }: PayloadAction<MenuForReviewEntity[]>) {
      const ratedBreads: RatedBread[] = payload.map(bread => {
        return {
          rating: 5,
          type: 'auto',
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
    updateManualSelectedBread(state, { payload }: PayloadAction<RatedBread>) {
      const manualSelectedBreads = state.manualSelectedBreads.map(selectedBreads => {
        if (selectedBreads.id === payload.id) {
          return { ...selectedBreads, ...payload };
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
    deleteManualSelectedBread(state, { payload }: PayloadAction<DeleteManualSelectedBread>) {
      state.manualSelectedBreads = state.manualSelectedBreads.filter(bread => bread.id !== payload.id);
    },
    updateSeletedBreadRating(state, { payload }: PayloadAction<UpdateSeletedBreadRating>) {
      state.selectedBreads = state.selectedBreads.map(bread => {
        return bread.id === payload.id ? { ...bread, rating: payload.rating } : bread;
      });
    },
    updateManualBreadRating(state, { payload }: PayloadAction<UpdateSeletedBreadRating>) {
      state.manualSelectedBreads = state.manualSelectedBreads.map(bread => {
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
  updateSelectedTags,
  updateAllSeletedBread,
  updateSelectedBread,
  updateManualSelectedBread,
  addManualSelectedBread,
  deleteManualSelectedBread,
  updateSeletedBreadRating,
  updateManualBreadRating,
  updateDetailReview,
  updateImages,
  resetSelectedBreads,
} = slice.actions;
