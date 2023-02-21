import EncryptedStorage from 'react-native-encrypted-storage';
import { requestRefresh } from '@/apis/auth/requestLogin';
import { LogoutRequest, requestLogout } from '@/apis/auth/requestLogout';
import { fetcher } from '@/apis/fetcher';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const USER_KEY = 'user';

export interface AuthState {
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  loading: false,
  accessToken: null,
  refreshToken: null,
  userId: null,
};

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface StoreTokens extends Tokens {
  userId: number;
}

const storeTokens = ({ accessToken, refreshToken, userId }: StoreTokens) => {
  return EncryptedStorage.setItem(
    USER_KEY,
    JSON.stringify({
      refreshToken,
      accessToken,
      userId,
    })
  );
};

const setHeader = (accessToken: string) => {
  fetcher.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const removeHeader = () => {
  fetcher.defaults.headers.common.Authorization = '';
};

export const initAuth = createAsyncThunk('auth/initAuth', async () => {
  const user = await EncryptedStorage.getItem(USER_KEY);
  if (!user) {
    return;
  }

  const { refreshToken, accessToken, userId } = JSON.parse(user);
  const { data } = await requestRefresh({ accessToken, refreshToken });
  storeTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken, userId: userId });

  return { ...data, userId };
});

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ accessToken, refreshToken, deviceToken }: LogoutRequest) => {
    return requestLogout({ accessToken, refreshToken, deviceToken });
    // EncryptedStorage.clear();
    // removeHeader();
    //
    // state.accessToken = null;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { accessToken, refreshToken, userId } = action.payload;

      storeTokens({ accessToken, refreshToken, userId });
      setHeader(accessToken);

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userId = userId;
    },
    logout(state) {
      EncryptedStorage.clear();
      removeHeader();

      state.accessToken = null;
      state.userId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initAuth.pending, state => {
        state.loading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;

          return;
        }

        const { accessToken, refreshToken, userId } = action.payload;

        storeTokens({ accessToken, refreshToken, userId });
        setHeader(accessToken);

        state.loading = false;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.userId = userId;
      })
      .addCase(initAuth.rejected, state => {
        state.loading = false;
      });

    builder.addCase(logout.fulfilled, state => {
      EncryptedStorage.clear();
      removeHeader();

      state.accessToken = null;
    });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
