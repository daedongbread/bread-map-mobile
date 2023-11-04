import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import bakeryMap from './bakeryMap';
import notification from './notification';
import reviewWrite from './reviewWrite';
import toast from './toast';

const reducers = {
  reviewWrite,
  auth,
  bakeryMap,
  notification,
  toast,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export const get = (key: keyof typeof reducers) => (state: RootState) => state[key];
export default store;
