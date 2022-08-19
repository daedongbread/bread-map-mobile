import { combineReducers } from '@reduxjs/toolkit';
import review from './review';
import user from './user';

const rootReducer = combineReducers({
  user,
  review,
});

export type RootState = ReturnType<typeof rootReducer>;

export const get = (key: keyof RootState) => (state: RootState) => state[key];

export default rootReducer;
