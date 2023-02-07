import {IGetDataHospitals, IHospital, IHospitalWithoutID, IModelPost, LoadingStatusesEnum} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {notification} from "antd";

export interface HospitalState {
    hospitals: Array<IHospital>
    status: LoadingStatusesEnum;
    edit_status: LoadingStatusesEnum;
    error_message?:string
}

const initialState: HospitalState = {
    status: LoadingStatusesEnum.idle,
    edit_status: LoadingStatusesEnum.idle,
    hospitals: []
};

export const fetchHospitals = createAsyncThunk<Array<IHospital>, undefined,{rejectValue:string, state:{hospitals:HospitalState}}>(
    'hospitals/fetchHospitals',
    async (_, {getState, rejectWithValue}) => {
        const state = getState()
        if ( getState().hospitals.hospitals.length) {
         return state.hospitals.hospitals
        }
        else {
            try {
                const response = await axios.get<IGetDataHospitals>(AjaxRoutes.GET_HOSPITALS)
                console.log('запрос на сервер');
                return response.data.hospitals;
            }
            catch (e:unknown) {
                const error=e as AxiosError
                return rejectWithValue(error.message)
            }
        }
    }
);

export const createHospital = createAsyncThunk<IHospital, IHospitalWithoutID, { rejectValue: string }>(
    'hospitals/createHospital',
    async (hospital, {rejectWithValue}) => {

        try {
            const response = await axios.put<IModelPost>(AjaxRoutes.POST_HOSPITAL, hospital)
            // debugger
            return {id: response.data.data.id, ...hospital};
        } catch (e: unknown) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const updateHospital = createAsyncThunk<IHospital, IHospital, { rejectValue: string,  }>(
    'hospitals/updateHospital',
    async (hospital, {rejectWithValue}) => {
        try {
            await axios.patch(AjaxRoutes.PATCH_HOSPITAL+hospital.id,hospital)
            return hospital
            // debugger
        } catch (e: unknown) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const hospitalsSlice = createSlice({
    name: 'hospitals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHospitals.pending, state => {
                state.status = LoadingStatusesEnum.loading
            })
            .addCase(fetchHospitals.rejected, state => {
                state.status = LoadingStatusesEnum.failed
            })
            .addCase(fetchHospitals.fulfilled, (state, action) => {
                // debugger
                state.status = LoadingStatusesEnum.idle
                state.hospitals = action.payload
            })
            .addCase(createHospital.pending, state => {
                state.edit_status = LoadingStatusesEnum.loading
            })
            .addCase(createHospital.rejected, state => {
                state.edit_status = LoadingStatusesEnum.failed
            })
            .addCase(createHospital.fulfilled, (state, action) => {
                // debugger

                const temp = action.payload
                state.hospitals.push(temp)
                state.edit_status = LoadingStatusesEnum.idle
            })
            .addCase(updateHospital.pending, state => {
                state.edit_status = LoadingStatusesEnum.loading
            })
            .addCase(updateHospital.rejected, (state,action) => {
                state.edit_status = LoadingStatusesEnum.failed
                state.error_message=action.payload

            })
            .addCase(updateHospital.fulfilled, (state, action) => {
                // debugger

                const hospitalID=state.hospitals.findIndex(item=>item.id===action.payload.id)
                state.hospitals[hospitalID]=action.payload
                state.edit_status = LoadingStatusesEnum.idle
            })
    }

})

export default hospitalsSlice.reducer
