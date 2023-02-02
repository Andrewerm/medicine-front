import {IGetDataUsers, IUser} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";

export interface UsersState {
    users: Array<IUser>
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
    status: "idle",
    users: []
};

export const fetchUsers = createAsyncThunk<IGetDataUsers>(
    'users/fetchUsers',
    async ( ) => {
        const response = await axios.get<IGetDataUsers>(AjaxRoutes.GET_USERS)
        return response.data;
    }
);

export const usersSlice=createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUsers.pending, state=>{
                state.status='loading'
            } )
            .addCase(fetchUsers.rejected, state => {
                state.status='failed'
            })
            .addCase(fetchUsers.fulfilled, (state, action)=>{
                state.status='idle'
                state.users=action.payload.data.users
            })
}

})

export default usersSlice.reducer
