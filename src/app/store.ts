import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import surveysSlice from "./surveysSlice";
import usersSlice from "./userSlice";
import hospitalSlice from "./hospitalSlice";
import analyticsSlice from "./analytycsSlice";

export const store = configureStore({
    reducer: {
        surveys: surveysSlice,
        users: usersSlice,
        hospitals: hospitalSlice,
        analytics: analyticsSlice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
