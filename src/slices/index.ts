import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import user from './user';

const reducers = {
  user,
  auth,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export const get = (key: keyof typeof reducers) => (state: RootState) => state[key];
export default store;
