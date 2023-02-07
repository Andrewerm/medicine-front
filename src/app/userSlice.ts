import {IGetDataUsers, IUser, LoadingStatusesEnum} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";

export interface UsersState {
    users: Array<IUser>
    status: LoadingStatusesEnum
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
                const response = await axios.get<IGetDataUsers>(AjaxRoutes.GET_USERS)
                console.log('запрос на сервер');
                return response.data.users;
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
            .addCase(fetchUsers.rejected, state => {
                state.status=LoadingStatusesEnum.failed
            })
            .addCase(fetchUsers.fulfilled, (state, action)=>{
                state.status=LoadingStatusesEnum.idle
                state.users=action.payload
            })
}

})

export default usersSlice.reducer
