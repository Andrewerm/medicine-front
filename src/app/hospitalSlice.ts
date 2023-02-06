import {IGetDataHospitals, IHospital, LoadingStatusesEnum} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";

export interface HospitalState {
    hospitals: Array<IHospital>
    status: LoadingStatusesEnum;
}

const initialState: HospitalState = {
    status: 'idle',
    hospitals: []
};

export const fetchHospitals = createAsyncThunk<IGetDataHospitals>(
    'hospitals/fetchHospitals',
    async ( ) => {
        const response = await axios.get<IGetDataHospitals>(AjaxRoutes.GET_HOSPITALS)
        return response.data;
    }
);


export const hospitalsSlice=createSlice({
    name: 'hospitals',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchHospitals.pending, state=>{
                state.status='loading'
            } )
            .addCase(fetchHospitals.rejected, state => {
                state.status='failed'
            })
            .addCase(fetchHospitals.fulfilled, (state, action)=>{
                // debugger
                state.status='idle'
                state.hospitals=action.payload.hospitals
            })
    }

})

export default hospitalsSlice.reducer
