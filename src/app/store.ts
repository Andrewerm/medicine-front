import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import surveysSlice from "./surveysSlice";

export const store = configureStore({
  reducer: {
    surveys: surveysSlice
 },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
