import EncryptedStorage from 'react-native-encrypted-storage';
import { LoginRequest, SocialProvider, requestRefresh } from '@/apis/auth/requestLogin';
import { LogoutRequest, requestLogout } from '@/apis/auth/requestLogout';
import { removeHeader, setHeader } from '@/apis/fetcher';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const USER_KEY = 'user';

export interface AuthState {
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  isNewbie?: boolean;
  idToken?: string | null;
  provider?: SocialProvider | null;
}

const initialState: AuthState = {
  loading: false,
  accessToken: null,
  refreshToken: null,
  userId: null,
  isNewbie: false,
  idToken: null,
  provider: null,
};

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface updateNewbieInfo extends LoginRequest {
  isNewbie: boolean;
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
    return requestLogout({
      accessToken,
      refreshToken,
      deviceToken,
    });
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
      state.isNewbie = false;
    },
    forceLogout(state) {
      EncryptedStorage.removeItem(USER_KEY);
      removeHeader();

      state.accessToken = null;
      state.userId = null;
    },
    updateNewbieInfo(state, { payload }: PayloadAction<updateNewbieInfo>) {
      state.isNewbie = payload.isNewbie;
      state.idToken = payload.token;
      state.provider = payload.provider;
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
      EncryptedStorage.removeItem(USER_KEY);
      removeHeader();

      state.accessToken = null;
    });
  },
});

export const { login, forceLogout, updateNewbieInfo } = authSlice.actions;

export default authSlice.reducer;
