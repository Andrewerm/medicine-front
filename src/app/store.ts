import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import surveysReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    surveys: surveysReducer,
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
