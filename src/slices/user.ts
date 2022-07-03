import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userId: string;
  userName: string;
}

const initialState: User = {
  userId: 'admin',
  userName: '관리자',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo(state, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { updateUserInfo } = userSlice.actions;
