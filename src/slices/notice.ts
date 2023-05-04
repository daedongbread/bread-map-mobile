import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoticeState {
  deviceToken: string | null;
}

const initialState: NoticeState = {
  deviceToken: null,
};

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    updateDeviceToken(state, action: PayloadAction<string | null>) {
      state.deviceToken = action.payload;
    },
  },
});

export default noticeSlice.reducer;
export const { updateDeviceToken } = noticeSlice.actions;
