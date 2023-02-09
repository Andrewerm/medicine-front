import {IGetDataUsers, IUser, LoadingStatusesEnum} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";

export interface UsersState {
    users: Array<IUser>
    status: LoadingStatusesEnum
    error_message?:string
}

const initialState: UsersState = {
    status: LoadingStatusesEnum.idle,
    users: []
};

export const fetchUsers = createAsyncThunk<Array<IUser>, undefined, {rejectValue:string, state:{users: UsersState}}>(
    'users/fetchUsers',
    async (_, {getState, rejectWithValue} ) => {
        const state=getState()
        if (getState().users.users.length) {
            return state.users.users
        }
        else {
            try {
                const response = await axios.get<IGetDataUsers>(AjaxRoutes.GET_USERS,{ withCredentials: true } )
                console.log('запрос на сервер');
                return response.data.items;
            }
            catch (e: unknown) {
                const error=e as AxiosError
                return rejectWithValue(error.message)
            }
        }

    }
);

export const usersSlice=createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUsers.pending, state=>{
                state.status=LoadingStatusesEnum.loading
            } )
            .addCase(fetchUsers.rejected, (state,action) => {
                state.status=LoadingStatusesEnum.failed
                state.error_message=action.payload
            })
            .addCase(fetchUsers.fulfilled, (state, action)=>{
                state.status=LoadingStatusesEnum.idle
                state.users=action.payload
            })
}

})

export default usersSlice.reducer
