import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoticeState {
  deviceToken: string | null;
}

const initialState: NoticeState = {
  deviceToken: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateDeviceToken(state, action: PayloadAction<string | null>) {
      state.deviceToken = action.payload;
    },
  },
});

export default notificationSlice.reducer;
export const { updateDeviceToken } = notificationSlice.actions;
