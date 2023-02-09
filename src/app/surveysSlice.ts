import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {
    IGetDataSurveys,
    IGetReport,
    IGetReportRequest,
    IGetReportResponse,
    ISetAnswer,
    ISurvey,
    LoadingStatusesEnum
} from "../types";

export interface SurveysState {
    surveys: Array<ISurvey>
    status: LoadingStatusesEnum;
    error_message?:string
}

const initialState: SurveysState = {
    status: LoadingStatusesEnum.idle,
    surveys: []
};

export const fetchSurveys = createAsyncThunk<Array<ISurvey>, undefined,  {rejectValue:string, state:{surveys: SurveysState}}>(
    'surveys/fetchSurveys',
    async (_, {getState, rejectWithValue} ) => {
        const state=getState()
        if (state.surveys.surveys.length) return state.surveys.surveys
        else {
            try {
                const response = await axios.get<IGetDataSurveys>(AjaxRoutes.GET_SURVEYS, { withCredentials: true })
                console.log('запрос на сервер');
                return response.data.surveys;
            }
            catch (e:unknown) {
                const error=e as AxiosError
                return rejectWithValue(error.message)
            }
        }

    }
);

export const getReport = createAsyncThunk<IGetReportResponse,IGetReportRequest, {rejectValue:string}>(
    'surveys/getReport',
    async (arg, {rejectWithValue}) => {
        try {
            const response = await axios.put(AjaxRoutes.GET_REPORT, arg, { withCredentials: true })
            return {
                idSurvey:arg.id,
                textReport:response.data
            }
        }
        catch (e:unknown) {
            const error=e as AxiosError
            return rejectWithValue(error.message)
        }

    }
);

export const surveysSlice = createSlice({
    name: 'surveys',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAnswer(state, {payload}: PayloadAction<ISetAnswer>) {
            const {idSurvey,idQuestion, idAnswer}=payload
            const survey=state.surveys?.find(item=>item.id===idSurvey)
            const question=survey?.questions?.find(item2=>item2.id===idQuestion)
            if (question) question.selectedAnswer=idAnswer
        },
        resetAnswers(state,{payload}:PayloadAction<number>){
            const survey=state.surveys.find(item=>item.id===payload)
            if (survey) survey.questions.forEach(item=>{
                item.selectedAnswer=undefined
            })
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchSurveys.pending, (state) => {
                state.status =LoadingStatusesEnum.loading;
            })
            .addCase(fetchSurveys.fulfilled, (state, action) => {
                state.status = LoadingStatusesEnum.idle;
                state.surveys=action.payload
            })
            .addCase(fetchSurveys.rejected, (state,action ) => {
                state.status = LoadingStatusesEnum.failed;
                state.error_message=action.payload
            })
            .addCase(getReport.pending, (state) => {
                state.status = LoadingStatusesEnum.loading;
            })
            .addCase(getReport.fulfilled, (state, action) => {
                state.status = LoadingStatusesEnum.idle;
                const survey=state.surveys.find(item=>item.id===action.payload.idSurvey)
                if (survey) survey.report=action.payload.textReport
            })
            .addCase(getReport.rejected, (state,action) => {
                state.status = LoadingStatusesEnum.failed;
                state.error_message=action.payload
            })
    },
});

export const {setAnswer, resetAnswers} = surveysSlice.actions;

export default surveysSlice.reducer;
