import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {IGetDataSurveys, IGetReport, IGetReportRequest, IGetReportResponse, ISetAnswer, ISurvey} from "../types";

export interface SurveysState {
    surveys: Array<ISurvey>
    status: 'idle' | 'loading' | 'failed';
}

const initialState: SurveysState = {
    status: "idle",
    surveys: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchSurveys = createAsyncThunk<IGetDataSurveys>(
    'surveys/fetchSurveys',
    async ( ) => {
        const response = await axios.get<IGetDataSurveys>(AjaxRoutes.GET_SURVEYS)
        return response.data;
    }
);

export const getReport = createAsyncThunk<IGetReportResponse,IGetReportRequest>(
    'surveys/getReport',
    async (arg) => {
        const response = await axios.post<IGetReport>(AjaxRoutes.GET_REPORT, arg)
        return {
            idSurvey:arg.idSurvey,
            textReport:response.data.data.textReport
        }
    }
);

export const surveysSlice = createSlice({
    name: 'surveys',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // addSurveys(state, action) {
        //     state.surveys = action.payload
        // },
        setAnswer(state, {payload}: PayloadAction<ISetAnswer>) {
            const {idSurvey,idQuestion, idAnswer}=payload
            const survey=state.surveys?.find(item=>item.id===idSurvey)
            const question=survey?.items?.find(item2=>item2.id===idQuestion)
            if (question) question.selectedAnswer=idAnswer
        },


    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchSurveys.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSurveys.fulfilled, (state, action) => {
                state.status = 'idle';
                state.surveys=action.payload.data.surveys
            })
            .addCase(fetchSurveys.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getReport.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getReport.fulfilled, (state, action) => {
                state.status = 'idle';
                const survey=state.surveys.find(item=>item.id===action.payload.idSurvey)
                if (survey) survey.report=action.payload.textReport
            })
            .addCase(getReport.rejected, (state) => {
                state.status = 'failed';
            })
    },
});

export const {setAnswer} = surveysSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectSurveys = (state: RootState) => state

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentValue = selectSurveys(getState());
//             // if (currentValue % 2 === 1) {
//             //   dispatch(incrementByAmount(amount));
//             // }
//         };

export default surveysSlice.reducer;