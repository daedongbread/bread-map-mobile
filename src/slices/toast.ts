import React from 'react';
import { SvgProps } from 'react-native-svg';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastState = {
  isShow?: boolean;
  duration?: number;
  position?: 'bottom' | 'center' | 'top';
  icon?: React.FC<SvgProps>;
  text: string;
};

const initialState: ToastState = {
  isShow: false,
  duration: 0.5 * 1000,
  position: 'bottom',
  text: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, { payload }: PayloadAction<ToastState>) {
      return { ...state, ...payload, isShow: true };
    },
    hideToast() {
      return { ...initialState };
    },
  },
});

export default toastSlice.reducer;
export const { showToast, hideToast } = toastSlice.actions;
