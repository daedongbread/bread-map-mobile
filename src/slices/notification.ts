import { PostTopic } from '@/apis/community/types';
import { NotificationType } from '@/apis/notification/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RequestedScreenInfo = {
  type: NotificationType;
  contentId: string;
  subContentId: string;
  extraParam: PostTopic;
};

interface NoticeState {
  deviceToken: string | null;
  requestedScreenInfo?: RequestedScreenInfo;
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
    updateRequestedScreenInfo(state, action: PayloadAction<RequestedScreenInfo>) {
      state.requestedScreenInfo = action.payload;
    },
    clearRequestedScreenInfo() {
      return { ...initialState };
    },
  },
});

export default notificationSlice.reducer;
export const { updateDeviceToken, updateRequestedScreenInfo, clearRequestedScreenInfo } = notificationSlice.actions;
