import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAnalytic, IAnalytics, LoadingStatusesEnum} from "../types";
import axios from "../configs/axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {AxiosError} from "axios";
import {hospitalsSlice} from "./hospitalSlice";

export const fetchAnalytics = createAsyncThunk<Array<IAnalytic>, undefined, { rejectValue: string, state: { analytics: AnalyticsStateInterface } }>(
    'analytics/fetchAnalytics',
    async (_, {getState, rejectWithValue}) => {
        if (!getState().analytics.analytics.length) {
            try {
                const response = await axios.get<IAnalytics>(AjaxRoutes.GET_ANALYTICS, {withCredentials: true})
                console.log('запрос на сервер');
                return response.data.analytics;
            } catch (e: unknown) {
                const error = e as AxiosError
                return rejectWithValue(error.message)
            }
        } else return getState().analytics.analytics
    }
)

export interface AnalyticsStateInterface {
    analytics: Array<IAnalytic>,
    status: LoadingStatusesEnum;
}

const initialState: AnalyticsStateInterface = {
    analytics: [],
    status: LoadingStatusesEnum.idle
}

interface setValueAnalyticInterface {
    analytic_id: string,
    parameter_id:string,
    value: Array<number>|Date
}

export const analyticsSlice = createSlice({
        name: 'analytics',
        initialState,
        reducers: {
            setValue(state, action:PayloadAction<setValueAnalyticInterface>){
                debugger
               const analytic=state.analytics.find(item=>item.id===action.payload.analytic_id)
                if (analytic) {
                    const parameter=analytic.parametrers.find(item => item.id === action.payload.parameter_id)
                    if (parameter) parameter.value = action.payload.value
                }
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAnalytics.pending, (state) => {
                    state.status = LoadingStatusesEnum.loading
                })
                .addCase(fetchAnalytics.rejected, state => {
                    state.status = LoadingStatusesEnum.failed
                })
                .addCase(fetchAnalytics.fulfilled, (state, action) => {
                    state.status = LoadingStatusesEnum.idle
                    if (action.payload) state.analytics = action.payload
                })
        }
    }
)
export const {setValue} = analyticsSlice.actions;
export default analyticsSlice.reducer
