import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ExecuteReportParamsInterface, IAnalytic, IAnalytics, LoadingStatusesEnum, ParametrValueType} from "../types";
import axios from "../configs/axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {AxiosError} from "axios";

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

export const executeReport = createAsyncThunk<{ analitycs_id: number, data: Blob }, number, {
    rejectValue: { error: string },
    state: { analytics: AnalyticsStateInterface }
}>(
    'analytics/executeReport',
    async (analitycs_id, {rejectWithValue, getState}) => {
        const param: ExecuteReportParamsInterface = {
            id: analitycs_id,
            parameters: getState().analytics.analytics?.find(item => item.id === analitycs_id)?.parametrers.map(item2 => ({
                id: item2.id,
                value: item2.value
            }))
        }
        try {
            const response = await axios.put<any>(AjaxRoutes.PUT_ANALYTICS, param, {withCredentials: true,  responseType: 'blob'})
            // debugger
            return {
                analitycs_id,
                data: response.data
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            return rejectWithValue({
                error: error.message
            })
        }
    }
)

export interface AnalyticsStateInterface {
    analytics: Array<IAnalytic>,
    status: LoadingStatusesEnum;
    report_status:LoadingStatusesEnum
}

const initialState: AnalyticsStateInterface = {
    analytics: [],
    status: LoadingStatusesEnum.idle,
    report_status: LoadingStatusesEnum.idle
}

interface setValueAnalyticInterface {
    analytic_id: number,
    parameter_id: number,
    value: ParametrValueType
}

export const analyticsSlice = createSlice({
        name: 'analytics',
        initialState,
        reducers: {
            setValue(state, action: PayloadAction<setValueAnalyticInterface>) {
                const analytic = state.analytics.find(item => item.id === action.payload.analytic_id)
                if (analytic) {
                    const parameter = analytic.parametrers.find(item => item.id === action.payload.parameter_id)
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

                .addCase(executeReport.pending, (state, action) => {
                    state.report_status = LoadingStatusesEnum.loading
                })
                .addCase(executeReport.rejected, (state, action) => {
                    state.report_status = LoadingStatusesEnum.failed
                })
                .addCase(executeReport.fulfilled, (state, action) => {
                    const analytic = state.analytics.find(item => item.id === action.payload.analitycs_id)
                    if (analytic) {
                        state.report_status = LoadingStatusesEnum.done
                        analytic.fileReport = action.payload.data
                    }
                })
        }
    }
)
export const {setValue} = analyticsSlice.actions;
export default analyticsSlice.reducer
