import {IGetDataHospitals, IHospital, IHospitalWithoutID, IHospitalPost, LoadingStatusesEnum} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import axios from "../configs/axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";

export interface HospitalState {
    hospitals: Array<IHospital>
    status: LoadingStatusesEnum;
    edit_status: LoadingStatusesEnum;
    error_message?:string,
    delete_status: LoadingStatusesEnum;
}

const initialState: HospitalState = {
    status: LoadingStatusesEnum.idle,
    edit_status: LoadingStatusesEnum.idle,
    delete_status: LoadingStatusesEnum.idle,
    hospitals: []
};

export const fetchHospitals = createAsyncThunk<Array<IHospital>|undefined, undefined,{rejectValue:string, state:{hospitals:HospitalState}}>(
    'hospitals/fetchHospitals',
    async (_, {getState, rejectWithValue}) => {
        const state = getState()
        if ( !state.hospitals.hospitals.length) {
            try {
                const response = await axios.get<IGetDataHospitals>(AjaxRoutes.GET_HOSPITALS, { withCredentials: true })
                console.log('запрос на сервер');
                return response.data.hospitals;
            }
            catch (e:unknown) {
                const error=e as AxiosError
                return rejectWithValue(error.message)
            }
        }
        else return state.hospitals.hospitals
    }
);

export const createHospital = createAsyncThunk<IHospital, IHospitalWithoutID, { rejectValue: string }>(
    'hospitals/createHospital',
    async (hospital, {rejectWithValue}) => {
        try {
            const response = await axios.put<IHospitalPost>(AjaxRoutes.POST_HOSPITAL, hospital, { withCredentials: true })
            return {id: response.data.hospital_id, ...hospital};
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
            await axios.patch(AjaxRoutes.PATCH_HOSPITAL+hospital.id,hospital, { withCredentials: true })
            return hospital
        } catch (e: unknown) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const deleteHospital=createAsyncThunk<number,number, { rejectValue: string,  }>(
    'hospitals/deleteHospital',
    async (idHospital, {rejectWithValue})=>{
        try {
            await axios.delete(AjaxRoutes.DELETE_HOSPITAL+idHospital, { withCredentials: true })
            return idHospital
        } catch (e: unknown) {
            const error = e as AxiosError<{message: string}>
            if (error.response?.status===422 &&  error.response?.data) return rejectWithValue(error.response.data.message)
             else return rejectWithValue(error.message)
        }
    }
)

export const hospitalsSlice = createSlice({
    name: 'hospitals',
    initialState,
    reducers: {
        setStatusToIdle(state){
            state.edit_status=LoadingStatusesEnum.idle
        },
        setDeleteStatusToIdle(state){
            state.delete_status=LoadingStatusesEnum.idle
        }
    },
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
                if (action.payload) state.hospitals = action.payload
            })
            .addCase(createHospital.pending, state => {
                state.edit_status = LoadingStatusesEnum.loading
            })
            .addCase(createHospital.rejected, state => {
                state.edit_status = LoadingStatusesEnum.failed
            })
            .addCase(createHospital.fulfilled, (state, action) => {
                const temp = action.payload
                state.hospitals.unshift(temp)
                state.edit_status = LoadingStatusesEnum.done
            })
            .addCase(updateHospital.pending, state => {
                state.edit_status = LoadingStatusesEnum.loading
            })
            .addCase(updateHospital.rejected, (state,action) => {
                state.edit_status = LoadingStatusesEnum.failed
                state.error_message=action.payload
            })
            .addCase(updateHospital.fulfilled, (state, action) => {
                const hospitalID=state.hospitals.findIndex(item=>item.id===action.payload.id)
                state.hospitals[hospitalID]=action.payload
                state.edit_status = LoadingStatusesEnum.done
            })
            .addCase(deleteHospital.pending, state => {
                state.delete_status = LoadingStatusesEnum.loading
            })
            .addCase(deleteHospital.rejected, (state,action) => {
                state.delete_status = LoadingStatusesEnum.failed
                state.error_message=action.payload
            })
            .addCase(deleteHospital.fulfilled, (state, action) => {
                state.hospitals=state.hospitals.filter(item=>item.id!==action.payload)
                state.delete_status = LoadingStatusesEnum.done
                })
    }

})
export const {setStatusToIdle, setDeleteStatusToIdle} = hospitalsSlice.actions;
export default hospitalsSlice.reducer
